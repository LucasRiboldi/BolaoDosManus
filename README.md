# ⚽ Bolão Copa 2026

Um aplicativo mobile de bolão para a Copa do Mundo de 2026, desenvolvido com React Native, Expo e Firebase.

## 🎯 Funcionalidades

### Autenticação e Usuários
- ✅ Login e registro com Firebase Auth
- ✅ Persistência de sessão
- ✅ Perfil do usuário com histórico

### Ranking em Tempo Real
- ✅ Ranking global atualizado automaticamente
- ✅ Badges para 1º, 2º e 3º colocados (🥇 🥈 🥉)
- ✅ Pontos por fase (Grupos e Mata-Mata)
- ✅ Destaque visual para o usuário atual

### Apostas - Fase de Grupos
- ✅ Interface de entrada de gols (estilo Excel)
- ✅ Seletor de grupos (A-H)
- ✅ Visualização de todas as partidas
- ✅ Salvamento automático no Firestore
- ✅ Indicador de apostas confirmadas

### Apostas - Mata-Mata
- ✅ Seleção de vencedor por partida
- ✅ Seletor de rodadas (32, 16, QF, SF, Final)
- ✅ Visualização do bracket
- ✅ Salvamento automático no Firestore

### Histórico de Apostas
- ✅ Visualização de todas as apostas do usuário
- ✅ Status de cada aposta (Acerto Exato, Acerto Parcial, Pendente, Errou)
- ✅ Pontos ganhos/perdidos por aposta
- ✅ Separação por fase (Grupos/Mata-Mata)

### Cálculo Automático de Pontos
- ✅ Sincronização com API-Football para resultados reais
- ✅ Cálculo automático de pontos quando resultado é confirmado
- ✅ Atualização em tempo real do ranking
- ✅ Regras de pontuação:
  - Acerto exato (placar correto): 10 pontos
  - Acerto de vencedor: 5 pontos
  - Mata-mata (vencedor correto): 10 pontos

### Compartilhamento Social
- ✅ Compartilhar ranking no WhatsApp
- ✅ Compartilhar no Instagram
- ✅ Compartilhamento nativo (iOS/Android)
- ✅ Deep links para convidar amigos

### Notificações Push
- ✅ Lembretes 1 hora antes de cada partida
- ✅ Notificações de resultados
- ✅ Notificações de mudanças no ranking
- ✅ Integração com Firebase Cloud Messaging

### Painel Admin
- ✅ Upload de arquivo JSON com dados das partidas
- ✅ Validação automática de dados
- ✅ Importação em lote para Firestore
- ✅ Acesso restrito por email

## 🛠️ Tech Stack

- **Frontend**: React Native com Expo SDK 54
- **Styling**: NativeWind (Tailwind CSS)
- **Autenticação**: Firebase Auth
- **Database**: Firestore (NoSQL)
- **API**: API-Football para resultados reais
- **Notificações**: Expo Notifications + Firebase Cloud Messaging
- **Linguagem**: TypeScript
- **Roteamento**: Expo Router

## 📱 Estrutura do Projeto

```
bolao-copa-2026/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Tela de Ranking
│   │   ├── groups.tsx         # Apostas Fase de Grupos
│   │   ├── knockout.tsx       # Apostas Mata-Mata
│   │   ├── history.tsx        # Histórico de Apostas
│   │   ├── profile.tsx        # Perfil do Usuário
│   │   └── _layout.tsx        # Layout com abas
│   ├── login.tsx              # Tela de Login
│   ├── register.tsx           # Tela de Registro
│   ├── admin.tsx              # Painel Admin
│   └── _layout.tsx            # Layout raiz
├── lib/
│   ├── firebase.ts            # Configuração Firebase
│   ├── types.ts               # Tipos TypeScript
│   ├── auth-context.tsx       # Contexto de autenticação
│   ├── api-football-service.ts # Serviço API-Football
│   ├── auto-scoring-service.ts # Cálculo automático de pontos
│   ├── notifications-service.ts # Serviço de notificações
│   ├── sharing-service.ts     # Serviço de compartilhamento
│   ├── scoring-service.ts     # Lógica de pontuação
│   └── world-cup-data.ts      # Dados da Copa 2026
├── hooks/
│   ├── use-auth.ts            # Hook de autenticação
│   ├── use-firestore.ts       # Hook do Firestore
│   ├── use-match-results.ts   # Hook para sincronizar resultados
│   └── use-colors.ts          # Hook de cores do tema
├── components/
│   ├── screen-container.tsx   # Wrapper de tela
│   ├── themed-view.tsx        # View com tema
│   └── ui/
│       └── icon-symbol.tsx    # Mapeamento de ícones
├── assets/
│   └── images/
│       ├── icon.png           # Logo do app
│       ├── splash-icon.png    # Ícone splash
│       └── favicon.png        # Favicon web
├── theme.config.js            # Configuração de cores
├── tailwind.config.js         # Configuração Tailwind
├── app.config.ts              # Configuração Expo
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou pnpm
- Conta Firebase
- Chave da API-Football (opcional, para resultados reais)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/bolao-copa-2026.git
cd bolao-copa-2026
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Habilite autenticação por email/senha
   - Crie um banco de dados Firestore
   - Copie as credenciais do Firebase

4. **Configure variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
EXPO_PUBLIC_API_FOOTBALL_KEY=sua_chave_api_football
```

5. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
# ou
npm run dev
```

6. **Abra em um dispositivo**
   - iOS: `pnpm ios`
   - Android: `pnpm android`
   - Web: Acesse `http://localhost:8081`

## 📊 Estrutura de Dados (Firestore)

### Coleção: `users`
```json
{
  "id": "user_id",
  "name": "Nome do Usuário",
  "email": "user@example.com",
  "totalPoints": 150,
  "groupPoints": 100,
  "knockoutPoints": 50,
  "position": 1,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-04-29T10:00:00Z"
}
```

### Coleção: `groupBets`
```json
{
  "id": "user_id_match_id",
  "userId": "user_id",
  "matchId": "match_1",
  "homeGoals": 2,
  "awayGoals": 1,
  "points": 10,
  "confirmed": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-04-29T10:00:00Z"
}
```

### Coleção: `knockoutBets`
```json
{
  "id": "user_id_match_id",
  "userId": "user_id",
  "matchId": "match_knockout_1",
  "winnerTeam": "Brasil",
  "points": 10,
  "confirmed": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-04-29T10:00:00Z"
}
```

## 🎮 Como Usar

### 1. Registre-se
- Acesse a tela de registro
- Preencha nome, email e senha
- Clique em "Criar Conta"

### 2. Faça Apostas na Fase de Grupos
- Acesse a aba "Grupos"
- Selecione um grupo (A-H)
- Preencha os gols para cada partida
- Clique em "Confirmar Aposta"

### 3. Faça Apostas no Mata-Mata
- Acesse a aba "Mata-Mata"
- Selecione uma rodada
- Escolha o time que passa de fase
- Clique em "Confirmar Aposta"

### 4. Acompanhe seu Ranking
- Acesse a aba "Ranking"
- Veja sua posição e pontos
- Compartilhe no WhatsApp ou Instagram

### 5. Revise seu Histórico
- Acesse a aba "Histórico"
- Veja todas as suas apostas
- Acompanhe os pontos ganhos/perdidos

## 🔐 Regras de Segurança do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Apostas de grupos
    match /groupBets/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Apostas de mata-mata
    match /knockoutBets/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Partidas (apenas leitura)
    match /matches/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Apenas admin pode escrever
    }
  }
}
```

## 📝 Regras de Pontuação

### Fase de Grupos
- **Acerto Exato**: Placar correto = 10 pontos
- **Acerto Parcial**: Vencedor correto = 5 pontos
- **Errou**: Resultado diferente = 0 pontos

### Mata-Mata
- **Acerto**: Time vencedor correto = 10 pontos
- **Errou**: Time vencedor incorreto = 0 pontos

## 🔄 Sincronização com API-Football

O aplicativo sincroniza automaticamente com a API-Football a cada 5 minutos para:
- Buscar resultados das partidas
- Atualizar placares
- Calcular pontos automaticamente
- Atualizar ranking em tempo real

## 📧 Painel Admin

Apenas usuários com emails autorizados podem acessar o painel admin em `/admin`.

### Como usar:
1. Acesse `/admin` (se autorizado)
2. Clique em "Selecionar Arquivo JSON"
3. Escolha um arquivo JSON com dados das partidas
4. O sistema valida e importa automaticamente

### Formato do JSON:
```json
{
  "matches": [
    {
      "id": "match_1",
      "homeTeam": "Brasil",
      "awayTeam": "Sérvia",
      "homeTeamFlag": "🇧🇷",
      "awayTeamFlag": "🇷🇸",
      "homeGoals": null,
      "awayGoals": null,
      "date": "2026-06-20T20:00:00Z",
      "group": "A",
      "status": "scheduled"
    }
  ]
}
```

## 🐛 Troubleshooting

### Problema: "Chave da API-Football inválida"
- Verifique se a chave está correta em `.env.local`
- Teste a chave no [site da API-Football](https://www.api-football.com/)

### Problema: Notificações não funcionam
- Certifique-se de que as permissões foram concedidas
- No iOS, verifique Configurações > Notificações
- No Android, verifique Configurações > Aplicativos > Bolão Copa 2026

### Problema: Firestore não conecta
- Verifique as credenciais do Firebase
- Certifique-se de que o Firestore está habilitado
- Verifique as regras de segurança do Firestore

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub ou entre em contato através do email.

## 🙏 Agradecimentos

- [Expo](https://expo.dev/) - Framework React Native
- [Firebase](https://firebase.google.com/) - Backend e autenticação
- [API-Football](https://www.api-football.com/) - Dados das partidas
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS para React Native

---

**Desenvolvido com ❤️ para a Copa do Mundo 2026**

⚽ Boa sorte nas suas apostas! 🍀
