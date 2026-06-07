import { useState } from "react";
import { Check, X, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
      { label: "Suporte dedicado", included: true },
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="precos" className="py-20 sm:py-28" style={{ backgroundColor: "#0a1628" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white text-balance">
            Conformidade NR-01 com condição de lançamento
          </h2>
          <p className="mt-4 text-[#94a3b8] text-pretty">
            Garanta agora com 70% de desconto — preço sobe após o período de lançamento
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
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
                      ? "bg-white text-[#0a1628]"
                      : "text-[#94a3b8] hover:text-white",
                  )}
                >
                  {opt === "monthly" ? "Mensal" : "Anual"}
                  {opt === "annual" && (
                    <span className="ml-1.5 text-[10px] uppercase tracking-wider text-green-400">
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
                      "relative rounded-2xl p-8 flex flex-col h-full",
                      hi
                        ? "bg-[#1e3a5f] border-2 border-[#2563eb]"
                        : "bg-[#1e293b] border border-white/[0.08]",
                    )}
                  >
                    {hi && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2563eb] text-white px-3 py-1 text-xs font-semibold shadow-sm whitespace-nowrap">
                        Mais escolhido
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="mt-2 text-sm text-[#94a3b8] mb-4">{p.desc}</p>

                    <div className="mt-2">
                      <p className="text-sm text-[#475569] line-through">De {price.from}</p>
                      <p className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-4xl font-bold text-[#60a5fa]">{price.now}</span>
                        <span className="text-sm text-[#64748b]">
                          /{annual ? "ano" : "mês"}
                        </span>
                      </p>
                    </div>

                    <div className="my-6 h-px bg-white/10" />

                    <ul className="space-y-2.5 flex-1">
                      {p.features.map((f) => (
                        <li key={f.label} className="flex items-start gap-2.5 text-sm">
                          {f.included ? (
                            <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#22c55e]" strokeWidth={2.5} />
                          ) : (
                            <X className="h-4 w-4 mt-0.5 shrink-0 text-[#64748b]" />
                          )}
                          <span className={cn(f.included ? "text-[#94a3b8]" : "text-[#64748b]")}>
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/checkout"
                      search={{ plan: p.id, cycle: annual ? "annual" : "monthly" }}
                      className={cn(
                        "mt-8 w-full inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        hi
                          ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                          : "bg-transparent border border-white/[0.15] text-[#94a3b8] hover:text-white hover:border-white/30",
                      )}
                    >
                      Assinar {p.name}
                    </Link>
                    {annual && (
                      <p className="mt-2 text-center text-[11px] leading-snug text-[#64748b]">
                        Você assina 12 meses e paga apenas 10 — 2 meses de vantagem.
                      </p>
                    )}
                  </div>
                </FadeInView>
              );
            })}
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-[#64748b]">
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
                    "relative rounded-2xl p-8 flex flex-col h-full",
                    hi
                      ? "bg-[#1e3a5f] border-2 border-[#2563eb] lg:scale-[1.02]"
                      : "bg-[#1e293b] border border-white/[0.08]",
                  )}
                >
                  {hi && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#2563eb] text-white px-3 py-1 text-xs font-semibold shadow-sm whitespace-nowrap">
                      Mais escolhido
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="mt-2 text-sm text-[#94a3b8] mb-4">{p.desc}</p>

                  <div className="mt-2">
                    <p className="text-sm text-[#475569] line-through">
                      De {price.from}
                    </p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-4xl font-bold text-[#60a5fa]">{price.now}</span>
                      <span className="text-sm text-[#64748b]">
                        /{annual ? "ano" : "mês"}
                      </span>
                    </p>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  <ul className="space-y-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5 text-sm">
                        {f.included ? (
                          <Check className="h-4 w-4 mt-0.5 text-[#22c55e] shrink-0" strokeWidth={2.5} />
                        ) : (
                          <X className="h-4 w-4 mt-0.5 shrink-0 text-[#64748b]" />
                        )}
                        <span className={cn(f.included ? "text-[#94a3b8]" : "text-[#64748b]")}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/checkout"
                    search={{ plan: p.id, cycle: annual ? "annual" : "monthly" }}
                    className={cn(
                      "mt-8 w-full inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      hi
                        ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                        : "bg-transparent border border-white/[0.15] text-[#94a3b8] hover:text-white hover:border-white/30",
                    )}
                  >
                    Assinar {p.name}
                  </Link>
                  {annual && (
                    <p className="mt-2 text-center text-[11px] leading-snug text-[#64748b]">
                      Você assina 12 meses e paga apenas 10 — 2 meses de vantagem.
                    </p>
                  )}
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-[#64748b]">
          <Lock className="h-3.5 w-3.5" />
          <span>Pagamento seguro · Cancele quando quiser · Suporte por e-mail incluído</span>
        </div>
      </div>
    </section>
  );
}
