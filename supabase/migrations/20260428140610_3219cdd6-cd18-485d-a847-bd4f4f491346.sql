
-- =========================================================================
-- 1) google_forms_config: remover SELECT anônimo (vazava CNPJ, email, etc.)
-- =========================================================================
DROP POLICY IF EXISTS "Public can read active configs" ON public.google_forms_config;

-- =========================================================================
-- 2) survey_sessions: remover acesso anônimo irrestrito (USING true)
-- =========================================================================
DROP POLICY IF EXISTS "Anon can read own session by token" ON public.survey_sessions;
DROP POLICY IF EXISTS "Anon can update own session by token" ON public.survey_sessions;

-- =========================================================================
-- 3) sync_logs: remover atalhos NULL que liberavam logs órfãos
-- =========================================================================
DROP POLICY IF EXISTS "Family sees own sync logs" ON public.sync_logs;
CREATE POLICY "Family sees own sync logs"
  ON public.sync_logs
  FOR SELECT
  TO authenticated
  USING (
    config_id IS NOT NULL
    AND config_owner_admin(config_id) IS NOT NULL
    AND get_account_owner(auth.uid()) = config_owner_admin(config_id)
  );

-- =========================================================================
-- 4) Função sem search_path fixo
-- =========================================================================
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- =========================================================================
-- 5) Revogar EXECUTE de funções SECURITY DEFINER administrativas
--    do público (anon/authenticated). Só service_role pode chamar.
-- =========================================================================
REVOKE EXECUTE ON FUNCTION public.promote_to_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.promote_to_admin(uuid) TO service_role;

REVOKE EXECUTE ON FUNCTION public.provision_subscription_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.provision_subscription_admin(uuid) TO service_role;
