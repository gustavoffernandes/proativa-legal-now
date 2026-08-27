import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Hero } from "@/sections/Hero";
import { Products } from "@/sections/Products";
import { WhySSTudo } from "@/sections/WhySSTudo";
import { Solution } from "@/sections/Solution";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";
import ogImageAsset from "@/assets/og-image-sstudo.png.asset.json";

const OG_IMAGE_URL = `https://sstudo.com.br${ogImageAsset.url}`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SSTudo — Soluções em SST: PGR, ASO, Denúncias e Riscos Psicossociais" },
      {
        name: "description",
        content:
          "A SSTudo reúne quatro soluções para conformidade em Segurança e Saúde no Trabalho: Diagnóstico PGR, Denúncia Proativa, ASO Digital e PsicoHub. Fale com um especialista.",
      },
      {
        name: "keywords",
        content:
          "sst, pgr, aso, canal de denúncias, riscos psicossociais, conformidade sst, segurança do trabalho, gestão de sst, nr1, burnout",
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
              name: "O que é a SSTudo?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A SSTudo é uma empresa de tecnologia com quatro produtos voltados para conformidade em Segurança e Saúde no Trabalho: Diagnóstico PGR, Denúncia Proativa, ASO Digital e PsicoHub.",
              },
            },
            {
              "@type": "Question",
              name: "Preciso contratar os 4 produtos juntos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não. Cada produto funciona de forma independente e pode ser contratado separadamente, de acordo com a necessidade da sua empresa.",
              },
            },
            {
              "@type": "Question",
              name: "A SSTudo atende empresas de qualquer porte?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim. Atendemos desde pequenas empresas até consultorias que gerenciam múltiplos clientes simultaneamente.",
              },
            },
            {
              "@type": "Question",
              name: "Como faço para contratar algum dos produtos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Basta clicar no botão de WhatsApp em qualquer parte do site ou acessar diretamente o site do produto de interesse. Nossa equipe vai te orientar sobre o melhor plano para sua empresa.",
              },
            },
            {
              "@type": "Question",
              name: "Os produtos são integrados entre si?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Estamos trabalhando na integração completa entre os quatro produtos, com login único e dashboard unificado.",
              },
            },
            {
              "@type": "Question",
              name: "A SSTudo oferece suporte técnico?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim, oferecemos suporte via WhatsApp, e-mail e chat para todos os clientes.",
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
        <Products />
        <WhySSTudo />
        <Solution />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
