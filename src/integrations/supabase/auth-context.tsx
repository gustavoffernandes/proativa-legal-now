// ============================================================================
// AuthProvider — expõe sessão Supabase para toda a app via contexto React
// ----------------------------------------------------------------------------
// O cliente Supabase é importado dinamicamente dentro do useEffect para que
// @supabase/supabase-js não entre no bundle inicial da landing page.
// ============================================================================

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const clientRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    (async () => {
      const { supabase } = await import("./client");
      if (cancelled) return;
      clientRef.current = supabase;

      // 1) Listener PRIMEIRO
      const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
        setLoading(false);
      });
      unsub = () => sub.subscription.unsubscribe();

      // 2) Sessão atual depois
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signOut: async () => {
          const client =
            clientRef.current ?? (await import("./client")).supabase;
          await client.auth.signOut();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
