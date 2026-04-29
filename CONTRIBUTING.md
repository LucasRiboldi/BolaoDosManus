# Contribuindo

## Comandos

```bash
pnpm dev
pnpm check
pnpm test
pnpm build
```

## Regras

- Nao commitar `.env`, `.env.local`, tokens, Firebase Admin SDK ou chaves privadas.
- Manter regras de seguranca do Firestore alinhadas com as colecoes `users`, `matches`, `predictions` e `settings`.
- Validar com `pnpm check`, `pnpm test` e `pnpm build` antes de publicar.
