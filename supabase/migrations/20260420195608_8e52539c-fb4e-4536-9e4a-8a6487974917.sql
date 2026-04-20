-- 1) Adiciona colunas de limites na tabela plans
ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS max_companies integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_surveys_per_month integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_respondents integer NOT NULL DEFAULT 20;

-- 2) Atualiza/insere os 3 planos com os limites corretos
INSERT INTO public.plans (id, name, description, max_users, max_companies, max_surveys_per_month, max_respondents, price_monthly, price_annual, features, active)
VALUES
  ('starter', 'Starter', 'Pequenas empresas e consultores independentes.',
   1, 1, 1, 20, 1, 1,
   jsonb_build_object(
     'relatorio_pdf', true,
     'exportacao_excel', true,
     'matriz_risco', false,
     'filtro_ghe', false,
     'suporte_prioritario', false
   ), true),
  ('professional', 'Profissional', 'Empresas e consultorias SST em crescimento.',
   2, 10, 10, 200, 1, 1,
   jsonb_build_object(
     'relatorio_pdf', true,
     'exportacao_excel', true,
     'matriz_risco', true,
     'filtro_ghe', true,
     'suporte_prioritario', false
   ), true),
  ('enterprise', 'Empresarial', 'Grandes operações, redes e consultorias.',
   5, 25, 50, 500, 59.97, 599.10,
   jsonb_build_object(
     'relatorio_pdf', true,
     'exportacao_excel', true,
     'matriz_risco', true,
     'filtro_ghe', true,
     'suporte_prioritario', true
   ), true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  max_users = EXCLUDED.max_users,
  max_companies = EXCLUDED.max_companies,
  max_surveys_per_month = EXCLUDED.max_surveys_per_month,
  max_respondents = EXCLUDED.max_respondents,
  price_monthly = EXCLUDED.price_monthly,
  price_annual = EXCLUDED.price_annual,
  features = EXCLUDED.features,
  active = true,
  updated_at = now();

-- 3) Remove o trigger que cria role no signup (se existir)
DROP TRIGGER IF EXISTS on_auth_user_created_landing ON auth.users;
DROP TRIGGER IF EXISTS handle_new_landing_user_trigger ON auth.users;

-- 4) Recria a função para criar APENAS o profile (sem user_roles)
CREATE OR REPLACE FUNCTION public.handle_new_landing_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;
  -- NÃO insere em user_roles. Só após pagamento aprovado.
  RETURN NEW;
END;
$$;

-- 5) Recria o trigger apontando para a função atualizada
CREATE TRIGGER on_auth_user_created_landing
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_landing_user();

-- 6) Função idempotente para provisionar admin após pagamento aprovado
CREATE OR REPLACE FUNCTION public.provision_subscription_admin(_subscription_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _sub RECORD;
  _expires_at timestamptz;
BEGIN
  SELECT id, user_id, plan_id, cycle, status, provisioned_at
    INTO _sub
  FROM public.subscriptions
  WHERE id = _subscription_id
  FOR UPDATE;

  IF _sub IS NULL THEN
    RAISE EXCEPTION 'subscription % not found', _subscription_id;
  END IF;

  IF _sub.status <> 'approved' THEN
    RAISE EXCEPTION 'subscription % is not approved (status=%)', _subscription_id, _sub.status;
  END IF;

  -- Calcula expiração
  IF _sub.cycle::text = 'annual' THEN
    _expires_at := now() + interval '365 days';
  ELSE
    _expires_at := now() + interval '30 days';
  END IF;

  -- Insere role admin (idempotente)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_sub.user_id, 'admin'::app_role)
  ON CONFLICT DO NOTHING;

  -- Cria/atualiza system_account com o plano contratado
  INSERT INTO public.system_accounts (user_id, plan_id, subscription_id, status, activated_at, expires_at)
  VALUES (_sub.user_id, _sub.plan_id, _sub.id, 'active', now(), _expires_at)
  ON CONFLICT DO NOTHING;

  -- Marca subscription como provisionada
  UPDATE public.subscriptions
  SET provisioned_at = COALESCE(provisioned_at, now()),
      provisioned_user_id = _sub.user_id,
      updated_at = now()
  WHERE id = _sub.id;
END;
$$;

-- 7) Permissões: somente service_role pode executar
REVOKE ALL ON FUNCTION public.provision_subscription_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.provision_subscription_admin(uuid) TO service_role;