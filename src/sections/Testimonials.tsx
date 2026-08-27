import { FadeInView, FadeInStagger, FadeInItem } from "@/components/FadeInView";

const testimonials = [
  {
    text: "A SSTudo simplificou nossa gestão de SST. O que levava dias em planilhas separadas, hoje resolvemos em uma única plataforma.",
    name: "Mariana Costa",
    role: "Técnica em SST · Consultoria em BH/MG",
    initials: "MC",
    bg: "#eff6ff",
    color: "#2563eb",
  },
  {
    text: "Uso o PsicoHub e o ASO Digital para meus mais de 15 clientes. Ter tudo integrado facilitou muito minha rotina como consultor.",
    name: "Ricardo Almeida",
    role: "Engenheiro de Segurança · Campo Grande/MS",
    initials: "RA",
    bg: "#f0fdf4",
    color: "#16a34a",
  },
  {
    text: "O canal de Denúncia Proativa trouxe mais confiança para nossos colaboradores reportarem problemas. A implementação foi rápida e simples.",
    name: "Fernanda Oliveira",
    role: "Coordenadora de RH · Indústria de alimentos/SP",
    initials: "FO",
    bg: "#faf5ff",
    color: "#7c3aed",
  },
  {
    text: "Recomendo a SSTudo para qualquer empresa que queira profissionalizar a gestão de SST sem contratar uma estrutura interna cara.",
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
            Quem já adequou o PGR à NR-01
          </h2>
          <p className="mt-3 text-base" style={{ color: "#64748b" }}>
            Consultorias e empresas que usam o SSTudo para atender a NR-01 sem
            complicação
          </p>
        </FadeInView>

        <FadeInStagger
          className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2"
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
