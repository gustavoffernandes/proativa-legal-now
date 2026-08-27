import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const faqs = [
  {
    q: "O que muda na NR-01 em relação ao PGR?",
    a: "A atualização da NR-01, em vigor desde maio de 2026, tornou obrigatório o mapeamento e gestão de riscos psicossociais no PGR. Isso inclui identificar fatores como burnout, assédio moral e sobrecarga de trabalho — e documentar as medidas de prevenção adotadas pela empresa.",
  },
  {
    q: "Burnout é considerado doença ocupacional pela NR-01?",
    a: "Sim. A partir da atualização da NR-01, burnout e outros transtornos psicossociais passaram a ser tratados como riscos ocupacionais que devem constar no PGR. Empresas sem esse mapeamento estão sujeitas a autuações e processos trabalhistas.",
  },
  {
    q: "O SSTudo serve para qualquer tamanho de empresa?",
    a: "Sim. O SSTudo atende desde pequenas empresas com um único CNPJ até consultorias SST que gerenciam dezenas de clientes simultaneamente.",
  },
  {
    q: "Como o SSTudo garante o anonimato dos respondentes?",
    a: "A pesquisa é enviada por link sem identificação. Nenhum dado pessoal é coletado dos respondentes — apenas as respostas às perguntas do formulário. O sistema está em conformidade com a LGPD.",
  },
  {
    q: "Quanto tempo leva para gerar o relatório do PGR?",
    a: "Após o encerramento da pesquisa, o relatório PDF completo é gerado em menos de 1 minuto. O documento já está no formato exigido para anexar ao PGR e apresentar em fiscalização da NR-01.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-primary"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <FadeInView className="text-center">
          <p className="text-xs uppercase tracking-widest text-background/80">FAQ</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl text-background text-balance">
            Perguntas frequentes
          </h2>
        </FadeInView>

        <FadeInStagger className="mt-10 w-full" staggerDelay={0.06}>
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <FadeInItem key={i}>
                <div>
                  <AccordionItem value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-medium text-background hover:no-underline">
                      <div>{f.q}</div>
                    </AccordionTrigger>
                    <AccordionContent className="text-background/85 leading-relaxed text-justify">
                      <div>
                        <p>{f.a}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </FadeInItem>
            ))}
          </Accordion>
        </FadeInStagger>
      </div>
    </section>
  );
}
