import { ShieldCheck, Unlock, CheckCircle, Handshake } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Segurança",
    description:
      "A proteção do trabalhador é inegociável para nós. Cumprimos rigorosamente todas as normas vigentes e atualizamos nossas plataformas sempre que a legislação muda, para que sua empresa nunca fique desatualizada.",
  },
  {
    icon: Unlock,
    title: "Acessibilidade",
    description:
      "Construímos tecnologia simples de usar, mesmo para quem não é especialista em SST. Linguagem clara, sem jargões desnecessários, e suporte humano de verdade quando você precisar de ajuda — não apenas robôs automatizados.",
  },
  {
    icon: CheckCircle,
    title: "Integridade",
    description:
      "Não vendemos atalhos nem soluções que burlam a legislação. Nosso compromisso é educar nossos clientes sobre suas obrigações reais, para que a conformidade seja genuína — não apenas documental.",
  },
  {
    icon: Handshake,
    title: "Parceria",
    description:
      "Não somos apenas fornecedores de software — somos parceiros de conformidade. Acompanhamos sua empresa em toda a jornada de SST, desde o diagnóstico inicial até a manutenção contínua da documentação exigida por lei.",
  },
];

export function WhySSTudo() {
  return (
    <section id="por-que-sstudo" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Tecnologia acessível para conformidade em SST
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Simplificamos a gestão de segurança e saúde do trabalho para empresas de todos os portes
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
