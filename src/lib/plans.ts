// ============================================================================
// CATÁLOGO DE PLANOS — Proativa
// ----------------------------------------------------------------------------
// Fonte única de verdade dos planos no FRONT. Os mesmos valores estão na
// tabela `public.plans` no Supabase. Sempre que alterar preço/feature/limite,
// lembre de atualizar AMBOS (front + tabela `plans`).
// ============================================================================

export type BillingCycle = "monthly" | "annual";

export type PlanId = "starter" | "professional" | "enterprise";

export interface PlanFeatures {
  relatorio_pdf: boolean;
  exportacao_excel: boolean;
  matriz_risco: boolean;
  filtro_ghe: boolean;
  suporte_prioritario: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  /** Limite de usuários do sistema (admin + colaboradores). */
  max_users: number;
  /** Limite de empresas/clientes que podem ser cadastrados. */
  max_companies: number;
  /** Limite de pesquisas criadas por mês. */
  max_surveys_per_month: number;
  /** Limite de respondentes por pesquisa/período. */
  max_respondents: number;
  features: PlanFeatures;
  /** Preço em REAIS (R$), valor numérico. */
  price: {
    monthly: number;
    annual: number;
  };
}

export const PLANS: Record<PlanId, Plan> = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "Pequenas empresas e consultores independentes.",
    max_users: 1,
    max_companies: 1,
    max_surveys_per_month: 1,
    max_respondents: 20,
    features: {
      relatorio_pdf: true,
      exportacao_excel: true,
      matriz_risco: false,
      filtro_ghe: false,
      suporte_prioritario: false,
    },
    price: { monthly: 1, annual: 1 },
  },
  professional: {
    id: "professional",
    name: "Profissional",
    description: "Empresas e consultorias SST em crescimento.",
    max_users: 2,
    max_companies: 10,
    max_surveys_per_month: 10,
    max_respondents: 200,
    features: {
      relatorio_pdf: true,
      exportacao_excel: true,
      matriz_risco: true,
      filtro_ghe: true,
      suporte_prioritario: false,
    },
    price: { monthly: 1, annual: 1 },
  },
  enterprise: {
    id: "enterprise",
    name: "Empresarial",
    description: "Grandes operações, redes e consultorias.",
    max_users: 5,
    max_companies: 25,
    max_surveys_per_month: 50,
    max_respondents: 500,
    features: {
      relatorio_pdf: true,
      exportacao_excel: true,
      matriz_risco: true,
      filtro_ghe: true,
      suporte_prioritario: true,
    },
    price: { monthly: 59.97, annual: 599.1 },
  },
};

export function getPlan(id: string | undefined): Plan | null {
  if (!id) return null;
  return (PLANS as Record<string, Plan>)[id] ?? null;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
