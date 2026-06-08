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
      { title: "SSTudo — Conformidade NR-01 | PGR e Burnout sem Planilhas" },
      {
        name: "description",
        content:
          "Adeque sua empresa à NR-01 agora. O SSTudo digitaliza o PGR com pesquisa anônima de burnout e riscos psicossociais — heatmap automático e relatório PDF em 1 clique. Experimente grátis.",
      },
      {
        name: "keywords",
        content:
          "nr1, pgr, burnout, saúde e segurança no trabalho, nr 1, psicossocial, segurança no trabalho, software sst, sistema sst, burnout no trabalho, riscos psicossociais, conformidade nr-01, pgr psicossocial",
      },
      { name: "author", content: "SSTudo" },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "pt-BR" },
      { name: "theme-color", content: "#0a1628" },

      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "SSTudo" },
      { property: "og:title", content: "SSTudo — Conformidade NR-01 | PGR e Burnout sem Planilhas" },
      {
        property: "og:description",
        content:
          "Adeque sua empresa à NR-01. Pesquisa anônima de burnout, heatmap de riscos e relatório PDF para o PGR. Rápido, seguro e sem planilhas.",
      },
      { property: "og:url", content: "https://sstudo.com.br/" },
      { property: "og:image", content: OG_IMAGE_URL },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SSTudo — Conformidade NR-01 | PGR e Burnout sem Planilhas" },
      {
        name: "twitter:description",
        content:
          "Adeque sua empresa à NR-01. Pesquisa anônima de burnout, heatmap de riscos e relatório PDF para o PGR. Rápido, seguro e sem planilhas.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [
      { rel: "canonical", href: "https://sstudo.com.br/" },
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
        <Testimonials />
        <FinalCTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
