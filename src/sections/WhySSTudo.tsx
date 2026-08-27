import { ShieldCheck, Unlock, CheckCircle, Handshake } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Segurança",
    description:
      "A proteção do trabalhador é inegociável. Cumprimos rigorosamente todas as normas vigentes.",
  },
  {
    icon: Unlock,
    title: "Acessibilidade",
    description:
      "Tecnologia simples de usar, com linguagem clara e suporte humano próximo — não apenas automatizado.",
  },
  {
    icon: CheckCircle,
    title: "Integridade",
    description:
      "Não vendemos atalhos. Educamos nossos clientes sobre suas obrigações reais perante a lei.",
  },
  {
    icon: Handshake,
    title: "Parceria",
    description:
      "Não somos apenas fornecedores — acompanhamos sua empresa em toda a jornada de conformidade em SST.",
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
