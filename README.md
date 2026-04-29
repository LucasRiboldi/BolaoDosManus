# Bolao dos Manus

Aplicacao mobile-first para bolao de placares da Copa do Mundo 2026.

## Stack

- React + Vite
- Firebase Authentication
- Firestore
- Firebase Hosting
- API-Football opcional para importar jogos oficiais

## Rodar local

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:5173`.

## Build

```bash
pnpm build
```

O build sai em `dist/`, pronto para Firebase Hosting.

## Configuracao

O Firebase Web SDK esta configurado em `src/firebase.ts` com o projeto `manusbolao`.

Crie um arquivo local `.env.local` para a API-Football:

```bash
VITE_API_FOOTBALL_KEY=sua_chave_api_football
```

Nao coloque Firebase Admin SDK, chaves privadas ou token do GitHub no frontend.

## Firestore

Colecoes usadas:

- `users/{uid}`: perfil, role, pontos e ranking.
- `rankings/{uid}`: dados publicos exibidos na tela de login.
- `matches/{matchId}`: jogos importados ou cadastrados.
- `predictions/{uid_matchId}`: placares enviados por usuario.
- `settings/bets`: trava global de envio e edicao.

Para habilitar o controle de admin, defina no documento do usuario:

```json
{
  "role": "admin"
}
```

## Fluxo

1. Tela de login mostra o ranking em tempo real.
2. Usuario cria conta ou entra com email e senha.
3. Usuario preenche placares dos jogos e salva no Firestore.
4. Usuario pode editar enquanto `settings/bets.locked` for `false`.
5. Admin trava ou reabre apostas no painel exibido para `role: "admin"`.
