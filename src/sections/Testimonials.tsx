import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const testimonials = [
  {
    text: "Antes a gente tabulava tudo no Excel — levava três dias. Com o SSTudo, o relatório sai em minutos e já está no formato certo para o PGR. Economizamos muito tempo de consultoria.",
    name: "Mariana Costa",
    role: "Técnica em SST · Consultoria em BH/MG",
    initials: "MC",
    bg: "#eff6ff",
    color: "#2563eb",
  },
  {
    text: "Atendo mais de 15 empresas e precisava de algo escalável. O painel multiempresa do SSTudo resolveu isso — consigo visualizar os riscos de cada cliente em segundos.",
    name: "Ricardo Almeida",
    role: "Engenheiro de Segurança · Campo Grande/MS",
    initials: "RA",
    bg: "#f0fdf4",
    color: "#16a34a",
  },
  {
    text: "A fiscalização veio antes do que esperávamos. Graças ao SSTudo, o PGR já estava completo com os riscos psicossociais devidamente documentados. Passamos sem nenhuma autuação.",
    name: "Fernanda Oliveira",
    role: "Coordenadora de RH · Indústria de alimentos/SP",
    initials: "FO",
    bg: "#faf5ff",
    color: "#7c3aed",
  },
  {
    text: "O heatmap visual é o que mais impressiona os clientes. Eles entendem imediatamente quais setores precisam de ação — sem precisar explicar planilha nenhuma.",
    name: "Carlos Mendes",
    role: "Consultor SST · Porto Alegre/RS",
    initials: "CM",
    bg: "#fff7ed",
    color: "#ea580c",
  },
];

function TestimonialCard({
  text,
  name,
  role,
  initials,
  bg,
  color,
}: (typeof testimonials)[number]) {
  return (
    <figure
      className="rounded-xl border p-6 shadow-sm h-full flex flex-col"
      style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
    >
      <div
        className="text-4xl leading-none select-none"
        style={{ color: "#dbeafe" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <blockquote
        className="mt-2 text-sm italic leading-relaxed flex-1"
        style={{ color: "#334155" }}
      >
        {text}
      </blockquote>
      <div className="mt-5 pt-5 border-t" style={{ borderColor: "#e2e8f0" }}>
        <figcaption className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold"
            style={{ backgroundColor: bg, color }}
          >
            {initials}
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: "#1e293b" }}>
              {name}
            </p>
            <p className="text-xs" style={{ color: "#64748b" }}>
              {role}
            </p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section style={{ backgroundColor: "#f8fafc" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <FadeInView className="text-center max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "#0f172a" }}
          >
            Quem já está em conformidade
          </h2>
          <p className="mt-3 text-base" style={{ color: "#64748b" }}>
            Consultorias e empresas que usam o SSTudo para atender a NR-01 sem
            complicação
          </p>
        </FadeInView>

        {/* Mobile: single column */}
        <div className="mt-10 sm:hidden space-y-4">
          {testimonials.map((t, i) => (
            <FadeInView key={t.name} delay={i * 0.1}>
              <TestimonialCard {...t} />
            </FadeInView>
          ))}
        </div>

        {/* Desktop: 2 columns */}
        <FadeInStagger
          className="mt-10 hidden sm:grid gap-5 sm:grid-cols-2"
          staggerDelay={0.12}
        >
          {testimonials.map((t) => (
            <FadeInItem key={t.name}>
              <TestimonialCard {...t} />
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
