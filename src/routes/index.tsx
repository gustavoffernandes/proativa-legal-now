import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Risk } from "@/sections/Risk";
import { Solution } from "@/sections/Solution";
import { HowItWorks } from "@/sections/HowItWorks";
import { Testimonials } from "@/sections/Testimonials";
import { FinalCTA } from "@/sections/FinalCTA";
import { Pricing } from "@/sections/Pricing";
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";
import ogImageAsset from "@/assets/og-image-sstudo.png.asset.json";

const OG_IMAGE_URL = `https://sstudo.com.br${ogImageAsset.url}`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SSTudo — NR-01 Riscos Psicossociais | PGR sem planilhas" },
      {
        name: "description",
        content:
          "Plataforma para Gestão de Riscos Psicossociais (NR-01). Mapeie, analise e gere relatórios prontos para o PGR. 70% OFF no lançamento — adeque sua empresa antes de 26/05/2026.",
      },
      {
        name: "keywords",
        content:
          "NR-01, riscos psicossociais, PGR, saúde mental no trabalho, SST, metodologia Proart, conformidade trabalhista, burnout ocupacional, gestão de riscos",
      },
      { name: "author", content: "SSTudo" },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "pt-BR" },
      { name: "theme-color", content: "#59554e" },

      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "SSTudo" },
      { property: "og:title", content: "SSTudo — Conformidade NR-01 sem planilhas" },
      {
        property: "og:description",
        content:
          "Plataforma com metodologia Proart para Gestão de Riscos Psicossociais. Heatmap, planos de ação e PDF pronto para o PGR.",
      },
      { property: "og:url", content: "https://sstudo.com.br/" },
      { property: "og:image", content: OG_IMAGE_URL },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SSTudo — Conformidade NR-01 sem planilhas" },
      {
        name: "twitter:description",
        content:
          "Mapeie, analise e gere relatórios de Riscos Psicossociais prontos para o PGR. 70% OFF no lançamento.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: "https://sstudo.com.br/" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap",
        onLoad: "this.onload=null;this.rel='stylesheet'",
      } as unknown as { rel: string; href: string },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "SSTudo",
              url: "https://sstudo.com.br",
              description:
                "Plataforma de Gestão de Riscos Psicossociais para conformidade com a NR-01.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "sstudo.oficial@gmail.com",
                contactType: "sales",
                areaServed: "BR",
                availableLanguage: ["Portuguese"],
              },
            },
            {
              "@type": "SoftwareApplication",
              name: "SSTudo",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "BRL",
                lowPrice: "20.97",
                highPrice: "59.97",
                offerCount: "3",
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "A pesquisa tem validade jurídica para o PGR?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Sim. O fluxo segue boas práticas de documentação para o PGR com rastreabilidade e relatórios exportáveis baseados na metodologia Proart.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Como o SSTudo garante o anonimato dos colaboradores?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Aplicamos separação de identidade, controles LGPD e agregação mínima dos dados para evitar reidentificação dos respondentes.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Risk />
        <Solution />
        <HowItWorks />
        <Pricing />
        <SocialProof />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
