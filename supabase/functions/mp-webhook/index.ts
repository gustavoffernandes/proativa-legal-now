// ============================================================================
// EDGE FUNCTION (Deno) — Mercado Pago Webhook
// ----------------------------------------------------------------------------
// URL final: https://<PROJECT_REF>.supabase.co/functions/v1/mp-webhook
//
// Configuração no painel do Mercado Pago (Suas integrações → Webhooks):
//   1) URL: https://pmoofkgrqcgtcrrgyzsu.supabase.co/functions/v1/mp-webhook
//   2) Eventos: marcar apenas "Pagamentos" (payment)
//   3) Copie a "Chave secreta" gerada e salve como secret MP_WEBHOOK_SECRET
//      no painel do Supabase (Edge Functions → Secrets).
//
// Secrets necessários (configurar no Supabase, NÃO no Lovable):
//   - MP_WEBHOOK_SECRET           → chave secreta do webhook do MP
//   - MP_ACCESS_TOKEN             → access token da sua aplicação MP
//   - SUPABASE_URL                → já vem por padrão nas Edge Functions
//   - SUPABASE_SERVICE_ROLE_KEY   → já vem por padrão nas Edge Functions
//
// Deploy:
//   supabase functions deploy mp-webhook --no-verify-jwt
//
// O flag --no-verify-jwt é OBRIGATÓRIO porque o Mercado Pago não envia JWT
// do Supabase; a autenticação é feita via assinatura HMAC própria do MP.
// ============================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const MP_API_BASE = "https://api.mercadopago.com";

interface MpWebhookBody {
  id?: string | number;
  type?: string;
  action?: string;
  data?: { id?: string | number };
}

interface MpPayment {
  id: number;
  status: string;
  status_detail?: string;
  external_reference?: string | null;
  transaction_amount?: number;
  payment_method_id?: string;
  payer?: { email?: string };
}

function parseSignatureHeader(header: string | null): { ts?: string; v1?: string } {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(",")) {
    const [k, v] = part.trim().split("=");
    if (k && v) out[k.trim()] = v.trim();
  }
  return { ts: out.ts, v1: out.v1 };
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function mapMpStatusToDb(mpStatus: string): "approved" | "pending" | "rejected" {
  if (mpStatus === "approved") return "approved";
  if (mpStatus === "pending" || mpStatus === "in_process") return "pending";
  return "rejected";
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-signature, x-request-id",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  // Health check (MP às vezes faz GET)
  if (req.method === "GET") {
    return new Response("ok", { status: 200, headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response("method not allowed", { status: 405, headers: CORS });
  }

  const url = new URL(req.url);
  const rawBody = await req.text();

  let body: MpWebhookBody = {};
  try {
    body = rawBody ? (JSON.parse(rawBody) as MpWebhookBody) : {};
  } catch {
    // pings podem vir vazios
  }

  const dataIdFromQuery = url.searchParams.get("data.id");
  const typeFromQuery = url.searchParams.get("type");
  const dataId = String(body.data?.id ?? dataIdFromQuery ?? "");
  const eventType = body.type ?? typeFromQuery ?? "";

  const requestId = req.headers.get("x-request-id");
  const signature = req.headers.get("x-signature");

  const webhookSecret = Deno.env.get("MP_WEBHOOK_SECRET");
  const mpToken = Deno.env.get("MP_ACCESS_TOKEN");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!webhookSecret || !mpToken || !supabaseUrl || !serviceRole) {
    console.error("[mp-webhook] secrets ausentes");
    return new Response("server misconfigured", { status: 500, headers: CORS });
  }

  // ---- Valida assinatura HMAC ----
  const { ts, v1 } = parseSignatureHeader(signature);
  if (!ts || !v1 || !dataId || !requestId) {
    console.warn("[mp-webhook] assinatura ausente/incompleta", {
      hasSig: !!signature,
      hasReqId: !!requestId,
      dataId,
    });
    return new Response("invalid signature", { status: 401, headers: CORS });
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const computed = await hmacSha256Hex(webhookSecret, manifest);
  if (!timingSafeEqualHex(computed, v1)) {
    console.warn("[mp-webhook] assinatura inválida");
    return new Response("invalid signature", { status: 401, headers: CORS });
  }

  if (!eventType.startsWith("payment")) {
    return new Response("ignored", { status: 200, headers: CORS });
  }

  // ---- Busca pagamento na API do MP ----
  const paymentRes = await fetch(`${MP_API_BASE}/v1/payments/${dataId}`, {
    headers: { Authorization: `Bearer ${mpToken}` },
  });
  if (!paymentRes.ok) {
    const txt = await paymentRes.text();
    console.error("[mp-webhook] erro ao buscar payment:", paymentRes.status, txt);
    return new Response("payment not found", { status: 200, headers: CORS });
  }
  const payment = (await paymentRes.json()) as MpPayment;

  const externalRef = payment.external_reference;
  if (!externalRef) {
    console.warn("[mp-webhook] payment sem external_reference", payment.id);
    return new Response("no external_reference", { status: 200, headers: CORS });
  }

  const newStatus = mapMpStatusToDb(payment.status);

  const supa = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existing } = await supa
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

  const { data: updated, error: updErr } = await supa
    .from("subscriptions")
    .update({ status: newStatus, metadata: newMeta })
    .eq("mp_external_reference", externalRef)
    .select("id")
    .maybeSingle();

  if (updErr) {
    console.error("[mp-webhook] erro update subscription:", updErr);
    return new Response("db error", { status: 500, headers: CORS });
  }
  if (!updated) {
    console.warn("[mp-webhook] subscription não encontrada para ref:", externalRef);
    return new Response("subscription not found", { status: 200, headers: CORS });
  }

  console.log("[mp-webhook] subscription atualizada:", {
    id: updated.id,
    status: newStatus,
    payment_id: payment.id,
  });

  return new Response("ok", { status: 200, headers: CORS });
});
