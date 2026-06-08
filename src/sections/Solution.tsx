import { Users, Flame, ListChecks, FileDown } from "lucide-react";
import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const features = [
  {
    icon: Users,
    title: "Pesquisa 100% anônima",
    desc: "Formulário validado com metodologia consagrada enviado por link. Os funcionários respondem sem identificação.",
  },
  {
    icon: Flame,
    title: "Heatmap de riscos automático",
    desc: "Matriz de probabilidade × severidade gerada automaticamente por setor e cargo.",
  },
  {
    icon: ListChecks,
    title: "Plano de ação integrado",
    desc: "Medidas de mitigação vinculadas a cada risco identificado, com responsável e prazo.",
  },
  {
    icon: FileDown,
    title: "Relatório PDF em 1 clique",
    desc: "Documento pronto para anexar ao PGR e apresentar em fiscalização. Exporta também para Excel e Google Sheets.",
  },
];

export function Solution() {
  return (
    <section id="solucao" className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-slate-900 text-balance">
              Tudo que a fiscalização exige, em uma plataforma
            </h2>
            <p className="mt-4 text-slate-500 text-pretty">
              Do envio da pesquisa ao relatório final para o PGR — sem planilha, sem consultoria cara
            </p>
          </div>
        </FadeInView>

        <FadeInStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
          {features.map((f) => (
            <FadeInItem key={f.title}>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm h-full">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
                  <f.icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
