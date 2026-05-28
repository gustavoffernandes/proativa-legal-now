import { Gavel, TrendingUp, Receipt } from "lucide-react";
import { FadeInView, FadeInStagger, FadeInItem } from "./FadeInView";

const items = [
  {
    icon: Gavel,
    title: "Multas e interdição",
    desc: "PGR sem riscos psicossociais pode gerar autuações acima de R$ 100 mil e paralisação das atividades.",
  },
  {
    icon: TrendingUp,
    title: "Passivo trabalhista",
    desc: "Burnout virou doença ocupacional. Sem evidências de prevenção, sua empresa perde na justiça.",
  },
  {
    icon: Receipt,
    title: "Aumento de impostos",
    desc: "Afastamentos psiquiátricos elevam o FAP/NTEP — você passa a pagar mais imposto sobre folha.",
  },
];

export function Risk() {
  return (
    <section id="risco" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-primary">O Risco</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-foreground text-balance">
              O que acontece se você ignorar a análise psicossocial?
            </h2>
            <p className="mt-4 text-muted-foreground text-pretty">
              A omissão deixa rastros na auditoria e na justiça. Três frentes que drenam caixa e reputação.
            </p>
          </div>
        </FadeInView>

        {/* Mobile: carrossel lateral */}
        <div className="mt-10 sm:hidden -mx-4">
          <div className="snap-row">
            {items.map((it, i) => (
              <FadeInView key={it.title} delay={i * 0.08} className="snap-item">
                <div className="rounded-2xl border border-border bg-card p-6 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <it.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <FadeInStagger className="mt-12 hidden sm:grid gap-6 sm:grid-cols-3">
          {items.map((it) => (
            <FadeInItem key={it.title}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-[var(--shadow-soft)] h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <it.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
