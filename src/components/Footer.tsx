import { Lock } from "lucide-react";
import logoSstudoAsset from "@/assets/logo-sstudo.webp.asset.json";
const logoSstudo = logoSstudoAsset.url;
import { FadeInView } from "./FadeInView";

export function Footer() {
  return (
    <FadeInView>
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-md bg-white px-2 py-1">
                  <img src={logoSstudo} alt="SSTudo — Conformidade NR-01" width={84} height={28} loading="lazy" decoding="async" className="h-7 w-auto" />
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">
                Plataforma para gestão de riscos psicossociais e conformidade com a NR-01. PGR digital, pesquisa de burnout anônima e relatório PDF para auditoria.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-2.5 py-1 text-[11px] text-primary-foreground/80">
                  <Lock className="h-3 w-3" /> SSL seguro
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-2.5 py-1 text-[11px] text-primary-foreground/80">
                  LGPD
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground">Produto</p>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
                <li><a href="#solucao" className="hover:text-primary-foreground">Recursos</a></li>
                <li><a href="#como" className="hover:text-primary-foreground">Como funciona</a></li>
                <li><a href="#precos" className="hover:text-primary-foreground">Planos</a></li>
                <li><a href="#faq" className="hover:text-primary-foreground">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary-foreground">Contato</p>
              <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
                <li><a href="mailto:contato@sstudo.com.br" className="hover:text-primary-foreground">contato@sstudo.com.br</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-primary-foreground/80">
            <p>© 2026 SSTudo. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </FadeInView>
  );
}
