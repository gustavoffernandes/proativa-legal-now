// ============================================================================
// /pedidos — lista de pedidos (subscriptions) do usuário logado.
// Mostra status, plano, valor e detalhes ao expandir. Inclui credenciais
// de acesso (e-mail cadastrado + lembrete da senha definida no signup).
// ============================================================================

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Loader2,
  Package,
  ChevronDown,
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  KeyRound,
  Copy,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/integrations/supabase/auth-context";
import { Button } from "@/components/ui/button";
import { getPlan, formatBRL, type PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus pedidos — Proativa" },
      { name: "description", content: "Acompanhe o status dos seus pedidos Proativa." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PedidosPage,
});

interface Order {
  id: string;
  plan_id: string;
  cycle: "monthly" | "annual";
  amount: number;
  status: "pending" | "approved" | "rejected" | "cancelled" | "refunded";
  mp_payment_id: string | null;
  mp_external_reference: string | null;
  created_at: string;
  provisioned_at: string | null;
  metadata: Record<string, unknown> | null;
}

const STATUS_LABEL: Record<Order["status"], string> = {
  pending: "Aguardando pagamento",
  approved: "Pagamento aprovado",
  rejected: "Recusado",
  cancelled: "Cancelado",
  refunded: "Reembolsado",
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    approved: { Icon: CheckCircle2, klass: "bg-success/10 text-success border-success/30" },
    pending: { Icon: Clock, klass: "bg-amber-500/10 text-amber-700 border-amber-500/30" },
    rejected: { Icon: XCircle, klass: "bg-destructive/10 text-destructive border-destructive/30" },
    cancelled: { Icon: XCircle, klass: "bg-muted text-muted-foreground border-border" },
    refunded: { Icon: XCircle, klass: "bg-muted text-muted-foreground border-border" },
  } as const;
  const { Icon, klass } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        klass,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label="Copiar"
    >
      {done ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function PedidosPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user) return;
      setLoading(true);
      const { data, error: err } = await supabase
        .from("subscriptions")
        .select(
          "id, plan_id, cycle, amount, status, mp_payment_id, mp_external_reference, created_at, provisioned_at, metadata",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (err) setError(err.message);
      else setOrders((data ?? []) as Order[]);
      setLoading(false);
    }
    load();

    // refresh ao voltar para a aba (pega webhook recente)
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para o site
          </Link>
          <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-3xl text-foreground">Meus pedidos</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe o status das suas compras e acesse suas credenciais.
            </p>
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <Package className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-3 font-display text-xl text-foreground">Nenhum pedido ainda</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quando você contratar um plano, ele aparecerá aqui.
              </p>
              <Button asChild className="mt-6">
                <Link to="/" hash="precos">
                  Ver planos
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => {
                const plan = getPlan(order.plan_id as PlanId);
                const planName =
                  plan?.name ??
                  (typeof order.metadata?.plan_name === "string"
                    ? (order.metadata.plan_name as string)
                    : order.plan_id);
                const isOpen = expanded === order.id;
                return (
                  <li
                    key={order.id}
                    className="rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : order.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display text-lg text-foreground">
                            Plano {planName}
                          </h3>
                          <StatusBadge status={order.status} />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {order.cycle === "annual" ? "Assinatura anual" : "Assinatura mensal"} ·{" "}
                          {new Date(order.created_at).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-display text-lg text-foreground">
                          {formatBRL(order.amount)}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-border bg-muted/20 p-5 sm:p-6 space-y-6">
                        {plan?.description && (
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                          <DetailRow label="ID do pedido" value={order.id} mono />
                          <DetailRow
                            label="Referência externa"
                            value={order.mp_external_reference ?? "—"}
                            mono
                          />
                          <DetailRow
                            label="ID pagamento Mercado Pago"
                            value={order.mp_payment_id ?? "—"}
                            mono
                          />
                          <DetailRow
                            label="Provisionado em"
                            value={
                              order.provisioned_at
                                ? new Date(order.provisioned_at).toLocaleString("pt-BR")
                                : "Aguardando aprovação"
                            }
                          />
                        </div>

                        {plan && (
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                              O que está incluso
                            </h4>
                            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-foreground">
                              <li>• {plan.max_companies} empresa(s)</li>
                              <li>• {plan.max_surveys_per_month} pesquisa(s)/mês</li>
                              <li>• {plan.max_respondents} respondentes</li>
                              <li>• {plan.max_users} usuário(s)</li>
                              {plan.features.relatorio_pdf && <li>• Relatório PDF</li>}
                              {plan.features.exportacao_excel && <li>• Exportação Excel</li>}
                              {plan.features.matriz_risco && <li>• Matriz de Risco P×S</li>}
                              {plan.features.filtro_ghe && <li>• Filtro por GHE/Setor</li>}
                              {plan.features.suporte_prioritario && <li>• Suporte prioritário</li>}
                            </ul>
                          </div>
                        )}

                        {order.status === "pending" && (
                          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
                            <p className="font-medium text-foreground">Aguardando confirmação do pagamento</p>
                            <p className="mt-1 text-muted-foreground">
                              Pagamentos via Pix podem levar alguns minutos. Assim que o Mercado
                              Pago confirmar, suas credenciais ficarão ativas automaticamente.
                            </p>
                          </div>
                        )}

                        {order.status === "approved" && (
                          <div className="rounded-xl border border-success/30 bg-success/5 p-5">
                            <h4 className="flex items-center gap-2 font-display text-base text-foreground">
                              <KeyRound className="h-4 w-4 text-success" /> Suas credenciais de
                              acesso
                            </h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Use estes dados para entrar na dashboard do Proativa.
                            </p>

                            <div className="mt-4 space-y-3">
                              <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
                                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                    E-mail
                                  </p>
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {user?.email}
                                  </p>
                                </div>
                                {user?.email && <CopyButton value={user.email} />}
                              </div>

                              <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                                <KeyRound className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                                    Senha
                                  </p>
                                  <p className="text-sm text-foreground">
                                    Use a mesma senha que você definiu no cadastro.
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Por segurança, sua senha não é armazenada em texto. Esqueceu?{" "}
                                    <Link
                                      to="/esqueci-senha"
                                      className="text-primary underline underline-offset-4"
                                    >
                                      Redefinir senha
                                    </Link>
                                    .
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {order.status === "rejected" && (
                          <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                            Pagamento recusado. Você pode tentar novamente escolhendo o plano
                            novamente na página inicial.
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-sm text-foreground break-all",
          mono && "font-mono text-xs",
        )}
      >
        {value}
      </p>
    </div>
  );
}
