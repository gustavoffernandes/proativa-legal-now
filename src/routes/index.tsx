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
      { title: "SSTudo — Conformidade NR-01 | PGR Digital sem Planilhas" },
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
      { name: "msapplication-TileImage", content: "/favicon-192x192.png" },
      { name: "msapplication-TileColor", content: "#225395" },

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
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/favicon-512x512.png" },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-2HCS0RWKLH",
        async: true,
      },
      {
        children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2HCS0RWKLH');
`,
      },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "O que muda na NR-01 em relação ao PGR?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A atualização da NR-01, em vigor desde maio de 2026, tornou obrigatório o mapeamento e gestão de riscos psicossociais no PGR. Isso inclui identificar fatores como burnout, assédio moral e sobrecarga de trabalho — e documentar as medidas de prevenção adotadas pela empresa.",
              },
            },
            {
              "@type": "Question",
              name: "Burnout é considerado doença ocupacional pela NR-01?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim. A partir da atualização da NR-01, burnout e outros transtornos psicossociais passaram a ser tratados como riscos ocupacionais que devem constar no PGR. Empresas sem esse mapeamento estão sujeitas a autuações e processos trabalhistas.",
              },
            },
            {
              "@type": "Question",
              name: "O SSTudo serve para qualquer tamanho de empresa?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim. O SSTudo atende desde pequenas empresas com um único CNPJ até consultorias SST que gerenciam dezenas de clientes simultaneamente. Os planos variam de 1 empresa (Starter) até 50 empresas (Empresarial).",
              },
            },
            {
              "@type": "Question",
              name: "Como o SSTudo garante o anonimato dos respondentes?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A pesquisa é enviada por link sem identificação. Nenhum dado pessoal é coletado dos respondentes — apenas as respostas às perguntas do formulário. O sistema está em conformidade com a LGPD.",
              },
            },
            {
              "@type": "Question",
              name: "Quanto tempo leva para gerar o relatório do PGR?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Após o encerramento da pesquisa, o relatório PDF completo é gerado em menos de 1 minuto. O documento já está no formato exigido para anexar ao PGR e apresentar em fiscalização da NR-01.",
              },
            },
            {
              "@type": "Question",
              name: "O desconto de 70% no plano de lançamento é permanente?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não. O desconto de 70% é válido apenas durante o período de lançamento. Quem assinar agora garante o preço promocional pelo período contratado. Após o lançamento, os valores retornam ao preço cheio.",
              },
            },
            {
              "@type": "Question",
              name: "Posso migrar de plano se minha consultoria crescer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim. É possível fazer upgrade de plano a qualquer momento pelo painel de assinatura. O valor pago é proporcional ao período restante do plano atual.",
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
