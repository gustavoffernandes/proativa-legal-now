// ============================================================================
// SERVER ROUTE — POST /api/mercado-pago-webhook
// ----------------------------------------------------------------------------
// Recebe notificações do Mercado Pago, valida assinatura HMAC (x-signature)
// e atualiza o status da subscription correspondente no Supabase.
//
// SEM provisionamento automático: o usuário usa o login criado no cadastro.
//
// Configuração no painel do Mercado Pago:
//   1) URL: https://proativa-legal-now.lovable.app/api/mercado-pago-webhook
//   2) Eventos: "Pagamentos" (payment)
//   3) Copiar a "Chave secreta" gerada e salvar em MERCADO_PAGO_WEBHOOK_SECRET
//
// Referência da assinatura:
//   https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
// ============================================================================

import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/admin.server";
import crypto from "crypto";

const MP_API_BASE = "https://api.mercadopago.com";

interface MpWebhookBody {
  id?: string | number;
  type?: string;
  action?: string;
  data?: { id?: string | number };
  date_created?: string;
  user_id?: string | number;
  api_version?: string;
  live_mode?: boolean;
}

interface MpPayment {
  id: number;
  status: "approved" | "pending" | "in_process" | "rejected" | "cancelled" | "refunded" | "charged_back" | string;
  status_detail?: string;
  external_reference?: string | null;
  transaction_amount?: number;
  payment_method_id?: string;
  payer?: { email?: string };
}

function parseSignatureHeader(header: string | null): { ts?: string; v1?: string } {
  if (!header) return {};
  const parts = header.split(",").map((p) => p.trim());
  const out: Record<string, string> = {};
  for (const p of parts) {
    const [k, v] = p.split("=");
    if (k && v) out[k.trim()] = v.trim();
  }
  return { ts: out.ts, v1: out.v1 };
}

function verifyMpSignature(opts: {
  secret: string;
  signatureHeader: string | null;
  requestId: string | null;
  dataId: string | null;
}): boolean {
  const { secret, signatureHeader, requestId, dataId } = opts;
  const { ts, v1 } = parseSignatureHeader(signatureHeader);
  if (!ts || !v1 || !dataId || !requestId) return false;

  // Manifest oficial do MP: "id:[data.id];request-id:[x-request-id];ts:[ts];"
  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  // timing-safe compare
  const a = Buffer.from(hmac, "hex");
  const b = Buffer.from(v1, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function mapMpStatusToDb(mpStatus: string): "approved" | "pending" | "rejected" {
  if (mpStatus === "approved") return "approved";
  if (mpStatus === "pending" || mpStatus === "in_process") return "pending";
  return "rejected"; // rejected, cancelled, refunded, charged_back…
}

export const Route = createFileRoute("/api/mercado-pago-webhook")({
  server: {
    handlers: {
      // MP testa o endpoint com GET às vezes; respondemos 200 para health.
      GET: async () => {
        return new Response("ok", { status: 200 });
      },

      POST: async ({ request }) => {
        const url = new URL(request.url);
        const rawBody = await request.text();

        let body: MpWebhookBody = {};
        try {
          body = rawBody ? (JSON.parse(rawBody) as MpWebhookBody) : {};
        } catch {
          // Pode vir vazio em pings; segue o fluxo
        }

        // data.id pode vir no body OU como query (?data.id=...&type=payment)
        const dataIdFromQuery = url.searchParams.get("data.id");
        const typeFromQuery = url.searchParams.get("type");
        const dataId = String(body.data?.id ?? dataIdFromQuery ?? "");
        const eventType = body.type ?? typeFromQuery ?? "";

        const requestId = request.headers.get("x-request-id");
        const signature = request.headers.get("x-signature");

        const webhookSecret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
        const mpToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

        if (!webhookSecret || !mpToken) {
          console.error("[mp-webhook] secrets ausentes");
          return new Response("server misconfigured", { status: 500 });
        }

        // ---- Valida assinatura HMAC ----
        const ok = verifyMpSignature({
          secret: webhookSecret,
          signatureHeader: signature,
          requestId,
          dataId,
        });
        if (!ok) {
          console.warn("[mp-webhook] assinatura inválida", {
            hasSig: !!signature,
            hasReqId: !!requestId,
            dataId,
          });
          return new Response("invalid signature", { status: 401 });
        }

        // Só processamos eventos de pagamento
        if (!eventType.startsWith("payment")) {
          return new Response("ignored", { status: 200 });
        }

        if (!dataId) {
          return new Response("missing data.id", { status: 400 });
        }

        // ---- Busca o pagamento real na API do MP ----
        const paymentRes = await fetch(`${MP_API_BASE}/v1/payments/${dataId}`, {
          headers: { Authorization: `Bearer ${mpToken}` },
        });
        if (!paymentRes.ok) {
          const txt = await paymentRes.text();
          console.error("[mp-webhook] erro ao buscar payment:", paymentRes.status, txt);
          // 200 para evitar retries infinitos quando o id é inválido
          return new Response("payment not found", { status: 200 });
        }
        const payment = (await paymentRes.json()) as MpPayment;

        const externalRef = payment.external_reference;
        if (!externalRef) {
          console.warn("[mp-webhook] payment sem external_reference", payment.id);
          return new Response("no external_reference", { status: 200 });
        }

        const newStatus = mapMpStatusToDb(payment.status);

        // ---- Lê metadata atual para preservar campos ----
        const { data: existing } = await supabaseAdmin
          .from("subscriptions")
          .select("id, metadata")
          .eq("mp_external_reference", externalRef)
          .maybeSingle();

        const prevMeta = (existing?.metadata ?? {}) as Record<string, unknown>;
        const newMeta = {
          ...prevMeta,
          mp_payment_id: String(payment.id),
          mp_payment_status: payment.status,
          mp_payment_status_detail: payment.status_detail ?? null,
          mp_payment_method: payment.payment_method_id ?? null,
        };

        // ---- Atualiza subscription ----
        const { data: updated, error: updErr } = await supabaseAdmin
          .from("subscriptions")
          .update({ status: newStatus, metadata: newMeta })
          .eq("mp_external_reference", externalRef)
          .select("id")
          .maybeSingle();

        if (updErr) {
          console.error("[mp-webhook] erro update subscription:", updErr);
          return new Response("db error", { status: 500 });
        }
        if (!updated) {
          console.warn("[mp-webhook] subscription não encontrada para ref:", externalRef);
          return new Response("subscription not found", { status: 200 });
        }

        console.log("[mp-webhook] subscription atualizada:", {
          id: updated.id,
          status: newStatus,
          payment_id: payment.id,
        });

        return new Response("ok", { status: 200 });
      },
    },
  },
});
