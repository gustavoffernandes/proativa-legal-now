// ============================================================================
// Supabase BROWSER client — conectado ao banco do SISTEMA Proativa
// ----------------------------------------------------------------------------
// Usa a chave publishable (anon). RLS aplica como o usuário autenticado.
// Persiste sessão no localStorage para manter login entre reloads.
// ============================================================================

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SYSTEM_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SYSTEM_SUPABASE_PUBLISHABLE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // Em dev, ajuda a diagnosticar; em build com SSR pode ser undefined até bundle
  console.warn("[supabase] VITE_SYSTEM_SUPABASE_URL/KEY ausente.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    storageKey: "proativa-landing-auth",
  },
});
