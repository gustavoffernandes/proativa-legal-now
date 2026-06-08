import { motion } from "framer-motion";
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
    // Adicionamos suporte ao dark mode (dark:bg-slate-950)
    <section id="como-funciona" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeInView>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl text-slate-900 dark:text-slate-50 text-balance">
              Em 3 passos, seu PGR está em conformidade com a NR-01
            </h2>
          </div>
        </FadeInView>

        <div className="relative mt-12">
          {/* 1. Animação da Linha Conectora:
            Substituímos a div padrão por um motion.div.
            Ele começa com escala horizontal 0 (scaleX: 0) e vai até 1.
            A classe 'origin-left' garante que a animação cresça da esquerda para a direita.
          */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-blue-200 dark:bg-blue-900/50 origin-left"
          />

          <FadeInStagger
            className="grid gap-8 grid-cols-1 md:grid-cols-4"
            staggerDelay={0.15}
          >
            {steps.map((s) => (
              <FadeInItem key={s.n}>
                {/* 2. Animação de Interação (Hover):
                  Envolvemos o conteúdo do card com um motion.div.
                  O 'whileHover={{ y: -8 }}' faz o elemento subir 8 pixels suavemente 
                  ao passar o mouse, simulando um efeito magnético.
                */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  {/* Adicionamos uma sombra suave (shadow-blue-500/30) no número para dar profundidade */}
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10 shadow-lg shadow-blue-500/30">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.desc}
                  </p>
                </motion.div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
