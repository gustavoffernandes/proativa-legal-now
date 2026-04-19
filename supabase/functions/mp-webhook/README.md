# Edge Function — `mp-webhook`

Recebe notificações do Mercado Pago, valida assinatura HMAC e atualiza o
status da `subscription` correspondente no Supabase.

## URL final

```
https://pmoofkgrqcgtcrrgyzsu.supabase.co/functions/v1/mp-webhook
```

Esta é a URL que você cola no painel do Mercado Pago.

## Pré-requisitos

- [Supabase CLI](https://supabase.com/docs/guides/cli) instalada
- Login feito: `supabase login`
- Projeto vinculado: `supabase link --project-ref pmoofkgrqcgtcrrgyzsu`

## Secrets (configurar no Supabase, NÃO no Lovable)

No painel do Supabase: **Project Settings → Edge Functions → Secrets**.

| Secret                 | Onde pegar                                                                      |
| ---------------------- | ------------------------------------------------------------------------------- |
| `MP_WEBHOOK_SECRET`    | Painel MP → Suas integrações → Webhooks → "Chave secreta"                       |
| `MP_ACCESS_TOKEN`      | Painel MP → Credenciais (production ou test, conforme o ambiente)               |

Os secrets `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` **já vêm por padrão**
em qualquer Edge Function — não precisa configurar.

Via CLI (alternativa ao painel):

```bash
supabase secrets set MP_WEBHOOK_SECRET=xxx MP_ACCESS_TOKEN=APP_USR-xxx
```

## Deploy

```bash
supabase functions deploy mp-webhook --no-verify-jwt
```

> ⚠️ O flag `--no-verify-jwt` é **obrigatório**. Por padrão o Supabase exige
> JWT no header `Authorization`, mas o Mercado Pago não envia JWT do Supabase
> — a autenticação é feita pela assinatura HMAC (`x-signature`) que o código
> valida internamente.

## Configuração no Mercado Pago

1. Painel MP → **Suas integrações** → escolha sua aplicação
2. Aba **Webhooks** → **Configurar notificações** (modo URL)
3. URL de produção: `https://pmoofkgrqcgtcrrgyzsu.supabase.co/functions/v1/mp-webhook`
4. Eventos: marque **apenas "Pagamentos"** (`payment`)
5. Salve, copie a **Chave secreta** gerada e configure como `MP_WEBHOOK_SECRET`
6. Use o **Simulador** para testar — deve responder `HTTP 200`

## Logs

```bash
supabase functions logs mp-webhook --tail
```

Ou no painel: **Edge Functions → mp-webhook → Logs**.

## Testes locais (opcional)

```bash
supabase functions serve mp-webhook --no-verify-jwt --env-file ./supabase/.env.local
```

Com `./supabase/.env.local` contendo `MP_WEBHOOK_SECRET`, `MP_ACCESS_TOKEN`,
`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
