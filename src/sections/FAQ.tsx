import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const faqs = [
  {
    q: "O que é a SSTudo?",
    a: "A SSTudo é uma empresa de tecnologia com quatro produtos voltados para conformidade em Segurança e Saúde no Trabalho: Diagnóstico PGR, Denúncia Proativa, ASO Digital e PsicoHub.",
  },
  {
    q: "Preciso contratar os 4 produtos juntos?",
    a: "Não. Cada produto funciona de forma independente e pode ser contratado separadamente, de acordo com a necessidade da sua empresa.",
  },
  {
    q: "A SSTudo atende empresas de qualquer porte?",
    a: "Sim. Atendemos desde pequenas empresas até consultorias que gerenciam múltiplos clientes simultaneamente.",
  },
  {
    q: "Como faço para contratar algum dos produtos?",
    a: "Basta clicar no botão de WhatsApp em qualquer parte do site ou acessar diretamente o site do produto de interesse. Nossa equipe vai te orientar sobre o melhor plano para sua empresa.",
  },
  {
    q: "Os produtos são integrados entre si?",
    a: "Estamos trabalhando na integração completa entre os quatro produtos, com login único e dashboard unificado.",
  },
  {
    q: "A SSTudo oferece suporte técnico?",
    a: "Sim, oferecemos suporte via WhatsApp, e-mail e chat para todos os clientes.",
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
