import { ShieldAlert, ClipboardCheck, Brain, FileSearch } from "lucide-react";

const PRODUCTS = [
  {
    icon: ShieldAlert,
    title: "Denúncia Proativa",
    description:
      "Canal de denúncias anônimas para sua empresa, com total conformidade à LGPD. Fortaleça a cultura de ética e compliance na organização.",
    button: "Conhecer o produto",
    href: "https://denunciaproativa.com.br",
  },
  {
    icon: ClipboardCheck,
    title: "ASO Digital",
    description:
      "Gestão completa de Atestados de Saúde Ocupacional e PCMSO, com integração direta a clínicas parceiras. Menos papel, mais controle.",
    button: "Conhecer o produto",
    href: "https://asodigital.net",
  },
  {
    icon: Brain,
    title: "PsicoHub",
    description:
      "Plataforma de análise de riscos psicossociais com pesquisa anônima, heatmap automático e relatórios técnicos prontos para o PGR.",
    button: "Falar sobre o PsicoHub",
    href: "https://wa.me/559391009999",
  },
];

export function Products() {
  return (
    <section id="produtos" className="py-16 lg:py-24" style={{ backgroundColor: "#f8fafc" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
            Quatro soluções, um só objetivo: sua empresa em conformidade
          </h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "#475569" }}>
            Cada ferramenta resolve uma frente da Segurança e Saúde no Trabalho
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="flex flex-col rounded-2xl border bg-white p-6 shadow-md"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#eff6ff" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#2563eb" }} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold" style={{ color: "#0f172a" }}>
                  {product.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {product.description}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  {product.button}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <div
            className="flex w-full max-w-md flex-col rounded-2xl border border-dashed p-5 md:flex-row md:items-center md:gap-5"
            style={{ backgroundColor: "#f1f5f9", borderColor: "#cbd5e1" }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <FileSearch className="h-5 w-5" style={{ color: "#2563eb" }} />
            </div>
            <div className="mt-3 flex-1 md:mt-0">
              <h4 className="font-display text-base font-semibold" style={{ color: "#0f172a" }}>
                Diagnóstico PGR
              </h4>
              <p className="mt-1 text-sm" style={{ color: "#475569" }}>
                Ferramenta gratuita para identificar rapidamente se sua empresa precisa de um PGR e quais documentos faltam.
              </p>
            </div>
            <a
              href="https://cloudi.com.br/preciso-de-pgr/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex shrink-0 items-center text-sm font-medium md:mt-0"
              style={{ color: "#2563eb" }}
            >
              Fazer diagnóstico grátis <span className="ml-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
