import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const steps = [
  {
    n: "1",
    title: "Cadastre sua empresa",
    desc: "Configure setores e cargos para preparar o mapeamento de riscos.",
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
              Em 3 passos, seu PGR está em conformidade com a NR-01
            </h2>
          </div>
        </FadeInView>

        <div className="relative mt-12">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-blue-200" />

          <FadeInStagger
            className="grid gap-8 grid-cols-1 md:grid-cols-4"
            staggerDelay={0.12}
          >
            {steps.map((s) => (
              <FadeInItem key={s.n}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
