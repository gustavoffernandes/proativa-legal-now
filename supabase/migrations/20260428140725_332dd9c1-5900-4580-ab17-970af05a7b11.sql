
-- Revoga EXECUTE de funções SECURITY DEFINER do role anon (visitantes).
-- Mantém para 'authenticated' pois são usadas pelas RLS policies.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_account_owner(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.config_owner_admin(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.config_owner_admin_text(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.action_plan_owner_admin(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_effective_subscription(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.set_owner_admin_id() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_user_role() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_landing_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM anon, authenticated;
