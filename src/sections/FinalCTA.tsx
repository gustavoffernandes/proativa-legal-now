export function FinalCTA() {
  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: "#2563eb" }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          Vamos conversar sobre a conformidade da sua empresa?
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/90">
          Fale agora com nossa equipe pelo WhatsApp e descubra qual produto SSTudo resolve o seu problema.
        </p>
        <a
          href="https://wa.me/5593991747798"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#ffffff", color: "#1d4ed8" }}
        >
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}
