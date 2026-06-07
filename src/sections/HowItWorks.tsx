import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const steps = [
  {
    n: "1",
    title: "Cadastre sua empresa",
    desc: "Configure setores, cargos e defina os grupos homogêneos de exposição (GHEs).",
  },
  {
    n: "2",
    title: "Envie a pesquisa",
    desc: "Compartilhe o link anônimo com os colaboradores. O SSTudo coleta e tabula tudo automaticamente.",
  },
  {
    n: "3",
    title: "Analise os riscos",
    desc: "Veja o heatmap, compare setores e identifique os pontos críticos com precisão.",
  },
  {
    n: "4",
    title: "Gere o relatório",
    desc: "Exporte o PDF completo para o PGR com um clique. Documento pronto para auditoria.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-slate-900 text-balance">
              Em 4 passos, sua empresa está em conformidade
            </h2>
          </div>
        </FadeInView>

        {/* Desktop: horizontal with connector line */}
        <div className="hidden md:block mt-12">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-blue-200" />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical */}
        <FadeInStagger className="md:hidden mt-12 flex flex-col gap-8" staggerDelay={0.12}>
          {steps.map((s) => (
            <FadeInItem key={s.n}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
