import heroLaptop from "@/assets/hero-laptop-v2.webp.asset.json";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0a1628" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 25% 50%, #0f2040 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Coluna esquerda */}
          <div className="flex flex-col items-start text-left">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.4)",
                color: "#93c5fd",
              }}
            >
              Conformidade em SST, em um só lugar
            </div>

            <h1 className="mt-6 max-w-xl font-display text-4xl md:text-5xl font-bold leading-[1.1] text-white">
              Soluções completas para sua empresa estar em{" "}
              <span style={{ color: "#60a5fa" }}>conformidade</span> com as
              normas de Segurança e Saúde no Trabalho
            </h1>

            <p
              className="mt-5 max-w-lg text-base leading-relaxed"
              style={{ color: "#94a3b8" }}
            >
              Sua empresa não precisa contratar quatro fornecedores
              diferentes para atender às exigências de SST. A SSTudo reúne
              PGR, ASO, canal de denúncias e análise de riscos psicossociais
              em soluções conectadas, pensadas para reduzir o trabalho manual
              e o risco de autuação — sem depender de planilhas ou processos
              manuais.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/559391009999"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-lg px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2563eb" }}
              >
                Falar com um especialista
              </a>
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
              style={{ color: "#94a3b8" }}
            >
              <span>🔒 LGPD compliant</span>
              <span>✓ 100% anônimo</span>
              <span>📄 PDF em 1 clique</span>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <img
              src={heroLaptop.url}
              alt="Painel de gestão SST da SSTudo"
              width={580}
              height={431}
              fetchPriority="high"
              decoding="async"
              className="w-full max-w-[580px] h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
