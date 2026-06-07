export function FinalCTA() {
  return (
    <section style={{ backgroundColor: "#2563eb" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">
          Não espere a autuação chegar
        </h2>
        <p className="mt-3 text-base" style={{ color: "#bfdbfe" }}>
          Adeque sua empresa à NR-01 hoje. Relatório pronto para o PGR em menos
          de 1 dia útil.
        </p>
        <div className="mt-8">
          <a
            href="#precos"
            className="inline-block rounded-xl font-bold text-lg px-8 py-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#ffffff", color: "#2563eb" }}
          >
            Adequar minha empresa agora
          </a>
        </div>
        <p className="mt-4 text-xs" style={{ color: "#bfdbfe" }}>
          Sem fidelidade · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
