// ============================================================================
// SERVER FUNCTION — Status público da compra (consulta por external_reference)
// ----------------------------------------------------------------------------
// Usada pelas páginas /checkout/sucesso, /checkout/erro e /checkout/pendente
// apenas para mostrar dados da compra (plano, ciclo, valor, status).
// Não há provisionamento automático: o usuário usa o login que criou no
// cadastro prévio.
//
// SEGURANÇA: o `ref` é um UUID v4 imprevisível, entregue apenas ao comprador
// na URL de retorno do Mercado Pago.
// ============================================================================

import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/admin.server";

export interface CheckoutStatusOutput {
  status: "pending" | "approved" | "rejected" | "unknown";
  plan_id: string | null;
  plan_name: string | null;
  cycle: "monthly" | "annual" | null;
  amount: number | null;
}

export const getCheckoutStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): { ref: string } => {
    const i = input as { ref?: string } | null;
    if (!i?.ref || typeof i.ref !== "string" || i.ref.length < 8) {
      throw new Error("ref obrigatório");
    }
    return { ref: i.ref };
  })
  .handler(async ({ data }): Promise<CheckoutStatusOutput> => {
    // SEGURANÇA: NÃO retornamos PII (e-mail, user_id) — somente dados do plano.
    // O `ref` aparece em URL e poderia vazar via histórico/referer, então
    // qualquer campo sensível foi removido da resposta.
    const { data: sub } = await supabaseAdmin
      .from("subscriptions")
      .select("status, plan_id, cycle, amount, metadata")
      .eq("mp_external_reference", data.ref)
      .maybeSingle();

    if (!sub) {
      return {
        status: "unknown",
        plan_id: null,
        plan_name: null,
        cycle: null,
        amount: null,
      };
    }

    const meta = (sub.metadata ?? {}) as Record<string, unknown>;
    const plan_name = typeof meta.plan_name === "string" ? meta.plan_name : null;

    const normalizedStatus: CheckoutStatusOutput["status"] =
      sub.status === "approved" || sub.status === "pending" || sub.status === "rejected"
        ? sub.status
        : "unknown";

    const normalizedCycle: CheckoutStatusOutput["cycle"] =
      sub.cycle === "monthly" || sub.cycle === "annual" ? sub.cycle : null;

    return {
      status: normalizedStatus,
      plan_id: sub.plan_id ?? null,
      plan_name,
      cycle: normalizedCycle,
      amount: typeof sub.amount === "number" ? sub.amount : null,
    };
  });
