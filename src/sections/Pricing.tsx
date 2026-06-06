import { useState } from "react";
import { Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PlanId } from "@/lib/plans";
import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

type Plan = {
  id: PlanId;
  name: string;
  desc: string;
  monthly: { from: string; now: string };
  annual: { from: string; now: string };
  features: { label: string; included: boolean }[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "Pequenas empresas e consultores independentes.",
    monthly: { from: "R$ 69,90", now: "R$ 20,70" },
    annual: { from: "R$ 697,00", now: "R$ 207,00" },
    features: [
      { label: "1 empresa", included: true },
      { label: "300 respondentes", included: true },
      { label: "Relatório PDF + Excel", included: true },
      { label: "Matriz de Risco P×S", included: false },
      { label: "Filtros GHE/Setor", included: false },
      { label: "Suporte dedicado", included: false },
    ],
  },
  {
    id: "professional",
    name: "Profissional",
    desc: "Empresas e consultorias SST em crescimento.",
    monthly: { from: "R$ 99,90", now: "R$ 29,70" },
    annual: { from: "R$ 997,00", now: "R$ 297,00" },
    features: [
      { label: "20 empresas", included: true },
      { label: "3000 respondentes", included: true },
      { label: "Relatório PDF + Excel", included: true },
      { label: "Matriz de Risco P×S", included: true },
      { label: "Filtros GHE/Setor", included: true },
      { label: "Suporte dedicado", included: false },
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    desc: "Grandes operações, redes e consultorias.",
    monthly: { from: "R$ 199,90", now: "R$ 59,70" },
    annual: { from: "R$ 1.997,00", now: "R$ 597,00" },
    features: [
      { label: "50 empresas", included: true },
      { label: "9000 respondentes", included: true },
      { label: "Relatório PDF + Excel", included: true },
      { label: "Matriz de Risco P×S", included: true },
      { label: "Filtros GHE/Setor", included: true },
      { label: "Suporte dedicado", included: true },
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="precos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-warning/40 bg-warning/10 text-warning-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="text-warning">Lançamento</span>
            <span className="mx-2 h-3 w-px bg-warning/40" />
            <span className="text-foreground">70% OFF</span>
          </span>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground text-balance">
            Conformidade com condição exclusiva.
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Garanta o SSTudo agora e construa o histórico de prevenção antes da NR-01 entrar em vigor.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            {(["monthly", "annual"] as const).map((opt) => {
              const active = (opt === "annual") === annual;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnnual(opt === "annual")}
                  className={cn(
                    "px-4 py-1.5 text-sm rounded-full transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {opt === "monthly" ? "Mensal" : "Anual"}
                  {opt === "annual" && (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wider text-success">
                      -2 meses
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </FadeInView>

        {/* Mobile: carrossel lateral */}
        <div className="mt-12 lg:hidden -mx-4">
          <div className="snap-row items-stretch">
            {plans.map((p, i) => {
              const price = annual ? p.annual : p.monthly;
              const hi = p.highlighted;
              return (
                <FadeInView key={p.name} delay={i * 0.1} className="snap-item">
                  <div
                    className={cn(
                      "relative rounded-2xl border p-6 flex flex-col h-full",
                      hi
                        ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-elevated)]"
                        : "bg-card border-border",
                    )}
                  >
                    {hi && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning text-warning-foreground px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm">
                        Mais escolhido
                      </span>
                    )}
                    <h3 className={cn("font-display text-2xl", hi ? "text-primary-foreground" : "text-foreground")}>{p.name}</h3>
                    <p className={cn("mt-2 text-sm min-h-[40px]", hi ? "text-primary-foreground/80" : "text-muted-foreground")}>{p.desc}</p>

                    <div className="mt-6">
                      <p className={cn("text-xs line-through", hi ? "text-primary-foreground/60" : "text-muted-foreground")}>De {price.from}</p>
                      <p className="mt-1 flex items-baseline gap-1.5">
                        <span className={cn("font-display text-4xl", hi ? "text-primary-foreground" : "text-foreground")}>{price.now}</span>
                        <span className={cn("text-sm", hi ? "text-primary-foreground/70" : "text-muted-foreground")}>
                          /{annual ? "ano" : "mês"}
                        </span>
                      </p>
                    </div>

                    <ul className="mt-6 space-y-2.5 flex-1">
                      {p.features.map((f) => (
                        <li key={f.label} className="flex items-start gap-2.5 text-sm">
                          {f.included ? (
                            <Check className={cn("h-4 w-4 mt-0.5 shrink-0", hi ? "text-success" : "text-success")} strokeWidth={2.5} />
                          ) : (
                            <X className={cn("h-4 w-4 mt-0.5 shrink-0", hi ? "text-primary-foreground/40" : "text-muted-foreground/50")} />
                          )}
                          <span
                            className={cn(
                              f.included
                                ? hi ? "text-primary-foreground" : "text-foreground"
                                : hi ? "text-primary-foreground/60" : "text-muted-foreground/70",
                            )}
                          >
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={cn("mt-8 w-full", hi && "bg-white text-primary hover:bg-white/90 shadow-sm")}
                      variant={hi ? "default" : "outline"}
                      size="lg"
                    >
                      <Link
                        to="/checkout"
                        search={{ plan: p.id, cycle: annual ? "annual" : "monthly" }}
                      >
                        Assinar {p.name}
                      </Link>
                    </Button>
                    {annual && (
                      <p className={cn("mt-2 text-center text-[11px] leading-snug", hi ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        Você assina 12 meses e paga apenas 10 — 2 meses de vantagem.
                      </p>
                    )}
                  </div>
                </FadeInView>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
            ← deslize para comparar →
          </p>
        </div>

        {/* Desktop: grid */}
        <FadeInStagger className="mt-12 hidden lg:grid gap-6 lg:grid-cols-3" staggerDelay={0.12}>
          {plans.map((p) => {
            const price = annual ? p.annual : p.monthly;
            const hi = p.highlighted;
            return (
              <FadeInItem key={p.name}>
                <div
                  className={cn(
                    "relative rounded-2xl border p-6 sm:p-8 flex flex-col h-full",
                    hi
                      ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-elevated)] lg:scale-[1.02]"
                      : "bg-card border-border",
                  )}
                >
                  {hi && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-warning text-warning-foreground px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm">
                      Mais escolhido
                    </span>
                  )}
                  <h3 className={cn("font-display text-2xl", hi ? "text-primary-foreground" : "text-foreground")}>{p.name}</h3>
                  <p className={cn("mt-2 text-sm min-h-[40px]", hi ? "text-primary-foreground/80" : "text-muted-foreground")}>{p.desc}</p>

                  <div className="mt-6">
                    <p className={cn("text-xs line-through", hi ? "text-primary-foreground/60" : "text-muted-foreground")}>
                      De {price.from}
                    </p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className={cn("font-display text-4xl", hi ? "text-primary-foreground" : "text-foreground")}>{price.now}</span>
                      <span className={cn("text-sm", hi ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        /{annual ? "ano" : "mês"}
                      </span>
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5 text-sm">
                        {f.included ? (
                          <Check className="h-4 w-4 mt-0.5 text-success shrink-0" strokeWidth={2.5} />
                        ) : (
                          <X className={cn("h-4 w-4 mt-0.5 shrink-0", hi ? "text-primary-foreground/40" : "text-muted-foreground/50")} />
                        )}
                        <span
                          className={cn(
                            f.included
                              ? hi ? "text-primary-foreground" : "text-foreground"
                              : hi ? "text-primary-foreground/60" : "text-muted-foreground/70",
                          )}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={cn("mt-8 w-full", hi && "bg-white text-primary hover:bg-white/90 shadow-sm")}
                    variant={hi ? "default" : "outline"}
                    size="lg"
                  >
                    <Link
                      to="/checkout"
                      search={{ plan: p.id, cycle: annual ? "annual" : "monthly" }}
                    >
                      Assinar {p.name}
                    </Link>
                  </Button>
                  {annual && (
                    <p className={cn("mt-2 text-center text-[11px] leading-snug", hi ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      Você assina 12 meses e paga apenas 10 — 2 meses de vantagem.
                    </p>
                  )}
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
