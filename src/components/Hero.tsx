import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Countdown } from "./Countdown";
import heroGif from "@/assets/hero-apresentacao.gif";

// GIF com pausa entre loops: toca uma vez (~1.3s) e congela no último frame por ~4s
function LoopingGif() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [showGif, setShowGif] = useState(true);
  const [bump, setBump] = useState(0);
  const PLAY_MS = 1300;
  const PAUSE_MS = 4000;

  useEffect(() => {
    if (showGif) {
      const t = setTimeout(() => {
        const img = imgRef.current;
        if (img && img.naturalWidth > 0) {
          try {
            const c = document.createElement("canvas");
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            const ctx = c.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              setSnapshot(c.toDataURL("image/png"));
            }
          } catch {
            /* sem snapshot, segue tocando */
          }
        }
        setShowGif(false);
      }, PLAY_MS);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setShowGif(true);
        setBump((b) => b + 1);
      }, PAUSE_MS);
      return () => clearTimeout(t);
    }
  }, [showGif, bump]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
      {showGif || !snapshot ? (
        <img
          key={bump}
          ref={imgRef}
          src={`${heroGif}?v=${bump}`}
          alt="Apresentação animada SSTudo"
          crossOrigin="anonymous"
          className="block w-full h-auto"
        />
      ) : (
        <img
          src={snapshot}
          alt="Apresentação SSTudo"
          className="block w-full h-auto"
        />
      )}
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
