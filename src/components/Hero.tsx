import { ArrowRight, Sparkles, ShieldCheck, BarChart3, Brain, FileCheck2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Countdown } from "./Countdown";

// Animação leve e integrada ao site — sem GIF/vídeo pesado.
function HeroAnimation() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square">
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-[2rem] bg-primary/20 blur-3xl"
        animate={{ opacity: [0.45, 0.7, 0.45], scale: [0.95, 1.02, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-8 rounded-2xl border border-border bg-card/90 backdrop-blur p-5 shadow-[var(--shadow-elevated)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success" />
          PGR · Riscos Psicossociais
        </div>
        <div className="mt-3 text-sm font-semibold text-foreground">
          Conformidade NR-01
        </div>

        <div className="mt-4 space-y-2.5">
          {[78, 92, 64].map((w, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>{["Estresse", "Liderança", "Carga"][i]}</span>
                <span>{w}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-end gap-1.5 h-12">
          {[40, 65, 50, 78, 60, 88, 72].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-primary/70"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {[
        { Icon: ShieldCheck, pos: "top-2 left-2", delay: 0 },
        { Icon: Brain, pos: "top-4 right-0", delay: 0.6 },
        { Icon: BarChart3, pos: "bottom-6 left-0", delay: 1.2 },
        { Icon: FileCheck2, pos: "bottom-2 right-4", delay: 1.8 },
      ].map(({ Icon, pos, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} h-11 w-11 rounded-xl border border-border bg-card shadow-md flex items-center justify-center text-primary`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-radial-soft" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Texto à esquerda */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Oferta de lançamento — <span className="text-success">70% OFF</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 max-w-xl text-balance font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground"
            >
              A nova NR-01 vai multar quem ignorar a{" "}
              <span className="italic text-primary">saúde mental</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-lg text-pretty text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              A partir de maio de 2026, a Gestão de Riscos Psicossociais é
              obrigatória no PGR. O SSTudo mapeia, analisa e gera relatórios
              prontos — sem planilhas, sem improviso.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-col items-start gap-3"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Vigência em
              </p>
              <Countdown />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <a href="#precos">
                  Proteger minha empresa
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                <a href="https://dashboard.sstudo.com.br" target="_blank" rel="noopener noreferrer">
                  Ver o dashboard
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Vídeo/GIF à direita */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full"
          >
            <LoopingGif />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
