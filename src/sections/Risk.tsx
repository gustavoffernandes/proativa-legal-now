import { AlertTriangle, Gavel, TrendingUp } from "lucide-react";
import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const cards = [
  {
    icon: AlertTriangle,
    impact: "até R\u00A0$\u00A0100 mil",
    title: "Multas e interdição",
    description:
      "O PGR sem mapeamento de riscos psicossociais já é motivo de autuação fiscal. As multas podem ultrapassar R$ 100 mil e incluir interdição parcial das atividades.",
  },
  {
    icon: Gavel,
    impact: "\u2191 processos trabalhistas",
    title: "Passivo trabalhista crescente",
    description:
      "Burnout e ansiedade são reconhecidos como doenças ocupacionais. Sem evidências de prevenção documentadas, sua empresa perde na Justiça do Trabalho.",
  },
  {
    icon: TrendingUp,
    impact: "FAP/NTEP elevado",
    title: "Mais imposto sobre a folha",
    description:
      "Afastamentos por transtornos psiquiátricos aumentam o fator FAP/NTEP e encarecem a alíquota do RAT — você paga mais imposto sobre a folha de pagamento.",
  },
];

export function Risk() {
  return (
    <section id="risco" className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl text-balance">
              O que acontece se sua empresa não se adequar?
            </h2>
            <p className="mt-4 text-slate-500 text-pretty">
              Três consequências reais para quem ignorar os riscos psicossociais na NR-01
            </p>
          </div>
        </FadeInView>

        {/* Mobile: scroll horizontal */}
        <div className="mt-10 sm:hidden -mx-4">
          <div className="snap-row">
            {cards.map((card, i) => (
              <FadeInView key={card.title} delay={i * 0.08} className="snap-item">
                <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <card.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <p className="mt-4 text-2xl font-bold text-red-600">{card.impact}</p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <FadeInStagger className="mt-12 hidden sm:grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <FadeInItem key={card.title}>
              <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <card.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <p className="mt-4 text-2xl font-bold text-red-600">{card.impact}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.description}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <p className="mt-10 text-center text-sm italic text-slate-500">
          A adequação custa menos do que uma única autuação.
        </p>
      </div>
    </section>
  );
}
