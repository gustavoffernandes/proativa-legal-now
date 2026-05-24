
-- google_forms_config: remove NULL-owner public read
DROP POLICY IF EXISTS "Family sees own companies" ON public.google_forms_config;
CREATE POLICY "Family sees own companies"
ON public.google_forms_config
FOR SELECT
TO authenticated
USING (
  owner_admin_id IS NOT NULL
  AND get_account_owner(auth.uid()) = owner_admin_id
);

-- survey_responses: remove NULL-owner public read
DROP POLICY IF EXISTS "Family sees own survey responses" ON public.survey_responses;
CREATE POLICY "Family sees own survey responses"
ON public.survey_responses
FOR SELECT
TO authenticated
USING (
  config_owner_admin(config_id) IS NOT NULL
  AND get_account_owner(auth.uid()) = config_owner_admin(config_id)
);

-- survey_sessions: remove NULL-owner public read
DROP POLICY IF EXISTS "Family sees own sessions" ON public.survey_sessions;
CREATE POLICY "Family sees own sessions"
ON public.survey_sessions
FOR SELECT
TO authenticated
USING (
  config_owner_admin(config_id) IS NOT NULL
  AND get_account_owner(auth.uid()) = config_owner_admin(config_id)
);

-- survey_sessions: restrict UPDATE for anon and authenticated
DROP POLICY IF EXISTS "Anon can update own session" ON public.survey_sessions;
DROP POLICY IF EXISTS "Authenticated can update own session" ON public.survey_sessions;

-- Anonymous respondents may only update sessions belonging to an active config.
-- This still allows respondents to advance their own session by token (handled
-- in app code), while preventing cross-config tampering with closed surveys.
CREATE POLICY "Anon updates session of active config"
ON public.survey_sessions
FOR UPDATE
TO anon
USING (
  EXISTS (
    SELECT 1 FROM public.google_forms_config c
    WHERE c.id = survey_sessions.config_id
      AND c.is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.google_forms_config c
    WHERE c.id = survey_sessions.config_id
      AND c.is_active = true
  )
);

-- Authenticated users may only update sessions of configs their account owns.
CREATE POLICY "Authenticated updates own family sessions"
ON public.survey_sessions
FOR UPDATE
TO authenticated
USING (
  config_owner_admin(config_id) IS NOT NULL
  AND get_account_owner(auth.uid()) = config_owner_admin(config_id)
)
WITH CHECK (
  config_owner_admin(config_id) IS NOT NULL
  AND get_account_owner(auth.uid()) = config_owner_admin(config_id)
);
