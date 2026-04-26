// ============================================================================
// /cadastro — criação de conta (email + senha + nome + telefone)
// O trigger handle_new_landing_user cria profile + role automaticamente.
// ============================================================================

import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema } from "@/lib/validations";

type Search = { redirect?: string };

export const Route = createFileRoute("/cadastro")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Criar conta — SSTudo" },
      { name: "description", content: "Crie sua conta SSTudo em segundos." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/cadastro" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function set<K extends keyof typeof form>(k: K) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          full_name: parsed.data.fullName,
          phone: parsed.data.phone,
        },
      },
    });

    if (authError) {
      setLoading(false);
      setError(
        authError.message.includes("already registered")
          ? "Este e-mail já está cadastrado. Faça login."
          : authError.message,
      );
      return;
    }

    // Se já tem sessão (confirmação desativada no Supabase), segue direto.
    if (authData.session) {
      setSuccess(true);
      setLoading(false);
      // Pequeno delay para o usuário enxergar a confirmação visual.
      setTimeout(() => {
        if (redirect && redirect.startsWith("/")) {
          window.location.href = redirect;
        } else {
          navigate({ to: "/", search: {} as never });
        }
      }, 800);
      return;
    }

    // Caso o projeto Supabase ainda exija confirmação, tentamos logar mesmo
    // assim com a senha recém criada — funciona quando "Confirm email" está off.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setLoading(false);
    if (signInError) {
      setError(
        "Conta criada! Agora faça login com seu e-mail e senha.",
      );
      setTimeout(() => navigate({ to: "/login", search: { redirect } as never }), 1500);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      if (redirect && redirect.startsWith("/")) {
        window.location.href = redirect;
      } else {
        navigate({ to: "/", search: {} as never });
      }
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-2xl text-foreground">SSTudo</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-soft)]">
          <h1 className="font-display text-2xl text-foreground text-center">Criar conta</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Comece sua jornada de conformidade
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={set("fullName")}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-0000"
                value={form.phone}
                onChange={set("phone")}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={set("password")}
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirme a senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repita a senha"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-success/40 bg-success/10 px-3 py-2 text-sm text-success-foreground">
                ✓ Conta criada com sucesso! Redirecionando…
              </div>
            )}

            <Button type="submit" disabled={loading || success} size="lg" className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {success ? "Pronto!" : "Criar conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link
              to="/login"
              search={{ redirect } as never}
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              Entrar
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
