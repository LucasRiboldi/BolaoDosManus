# 🏆 Bolão dos Manus - Copa do Mundo 2026

> Uma plataforma completa de bolão para a Copa do Mundo 2026, desenvolvida com React Native e Firebase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Expo](https://img.shields.io/badge/Expo-54.0-000.svg?style=flat&logo=expo)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange.svg?style=flat&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## 📋 Visão Geral

**Bolão dos Manus** é um aplicativo mobile que permite aos usuários fazer apostas em partidas da Copa do Mundo 2026, acompanhar seu ranking em tempo real, visualizar histórico de apostas e compartilhar resultados em redes sociais.

O aplicativo sincroniza automaticamente com a API-Football para obter resultados reais, calcula pontos automaticamente e envia notificações push para manter os usuários engajados.

## ✨ Principais Funcionalidades

### 🔐 Autenticação e Gerenciamento de Usuários
- Registro e login com Firebase Authentication
- Persistência segura de sessão
- Perfil de usuário com histórico completo
- Logout seguro

### 🏅 Ranking em Tempo Real
- Ranking global atualizado automaticamente
- **Badges especiais para top 3** (🥇 🥈 🥉)
- Pontos separados por fase (Grupos e Mata-Mata)
- Destaque visual do usuário atual
- Atualização em tempo real via Firestore

### ⚽ Apostas - Fase de Grupos
- Interface intuitiva de entrada de gols (estilo planilha Excel)
- Seletor de grupos (A-H)
- Visualização de todas as 64 partidas da fase de grupos
- Salvamento automático no Firestore
- Indicador visual de apostas confirmadas
- Bloqueio de edição após início da partida

### 🏆 Apostas - Mata-Mata
- Seleção de vencedor por partida
- Seletor de rodadas (32, 16, QF, SF, Final)
- Visualização do bracket completo
- Atualização em cascata (vencedor avança automaticamente)
- Salvamento automático no Firestore

### 📊 Histórico de Apostas
- Visualização completa de todas as apostas do usuário
- Status detalhado de cada aposta:
  - ✅ Acerto Exato (10 pontos)
  - ⚠️ Acerto Parcial (5 pontos)
  - ⏳ Pendente (aguardando resultado)
  - ❌ Errou (0 pontos)
- Separação por fase (Grupos/Mata-Mata)
- Filtros e busca
- Pontos ganhos/perdidos por aposta

### 🤖 Cálculo Automático de Pontos
- Sincronização em tempo real com API-Football
- Cálculo automático quando resultado é confirmado
- Atualização instantânea do ranking
- Regras de pontuação transparentes:
  - **Fase de Grupos**: Acerto exato (10 pts) | Acerto de vencedor (5 pts)
  - **Mata-Mata**: Vencedor correto (10 pts)

### 📱 Compartilhamento Social
- Compartilhar ranking no **WhatsApp** com emojis e formatação
- Compartilhar no **Instagram** (Stories/Feed)
- Compartilhamento nativo (iOS/Android)
- Deep links para convidar amigos
- Texto personalizado com posição e pontos

### 🔔 Notificações Push
- Lembretes 1 hora antes de cada partida
- Notificações de resultados confirmados
- Notificações de mudanças no ranking
- Integração com Firebase Cloud Messaging
- Customizável por usuário

### 👨‍💼 Painel Admin
- Upload de arquivo JSON com dados das partidas
- Validação automática de dados
- Importação em lote para Firestore
- Acesso restrito por email
- Exemplo de JSON fornecido na interface
- Logs de importação

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React Native** | 0.81 | Framework mobile |
| **Expo SDK** | 54 | Plataforma de desenvolvimento |
| **TypeScript** | 5.9 | Tipagem estática |
| **Firebase Auth** | Latest | Autenticação |
| **Firestore** | Latest | Banco de dados NoSQL |
| **Firebase Messaging** | Latest | Notificações push |
| **NativeWind** | 4.2 | Tailwind CSS para React Native |
| **Expo Router** | 6 | Roteamento |
| **API-Football** | Latest | Dados de partidas em tempo real |

## 📁 Estrutura do Projeto

```
bolao-copa-2026/
├── 📱 app/
│   ├── (tabs)/                    # Abas principais
│   │   ├── index.tsx              # 🏆 Ranking
│   │   ├── groups.tsx             # ⚽ Apostas Grupos
│   │   ├── knockout.tsx           # 🏆 Apostas Mata-Mata
│   │   ├── history.tsx            # 📊 Histórico
│   │   ├── profile.tsx            # 👤 Perfil
│   │   └── _layout.tsx            # Layout com abas
│   ├── login.tsx                  # 🔐 Login
│   ├── register.tsx               # 📝 Registro
│   ├── admin.tsx                  # 👨‍💼 Painel Admin
│   └── _layout.tsx                # Layout raiz
│
├── 📚 lib/
│   ├── firebase.ts                # ⚙️ Configuração Firebase
│   ├── types.ts                   # 📋 Tipos TypeScript
│   ├── auth-context.tsx           # 🔐 Contexto de autenticação
│   ├── api-football-service.ts    # ⚽ Integração API-Football
│   ├── auto-scoring-service.ts    # 🤖 Cálculo automático de pontos
│   ├── notifications-service.ts   # 🔔 Serviço de notificações
│   ├── sharing-service.ts         # 📱 Compartilhamento social
│   ├── scoring-service.ts         # 📊 Lógica de pontuação
│   └── world-cup-data.ts          # 🌍 Dados da Copa 2026
│
├── 🎣 hooks/
│   ├── use-auth.ts                # 🔐 Hook de autenticação
│   ├── use-firestore.ts           # 🔥 Hook do Firestore
│   ├── use-match-results.ts       # ⚽ Hook para sincronizar resultados
│   └── use-colors.ts              # 🎨 Hook de cores
│
├── 🧩 components/
│   ├── screen-container.tsx       # 📱 Wrapper de tela
│   ├── themed-view.tsx            # 🎨 View com tema
│   └── ui/
│       └── icon-symbol.tsx        # 🎯 Mapeamento de ícones
│
├── 🎨 assets/
│   └── images/
│       ├── icon.png               # Logo do app
│       ├── splash-icon.png        # Ícone splash
│       └── favicon.png            # Favicon web
│
├── ⚙️ Configuração
│   ├── theme.config.js            # Paleta de cores
│   ├── tailwind.config.js         # Tailwind CSS
│   ├── app.config.ts              # Expo config
│   └── package.json               # Dependências
│
└── 📖 Documentação
    ├── README.md                  # Este arquivo
    ├── CONTRIBUTING.md            # Guia de contribuição
    └── LICENSE                    # MIT License
```

## 🚀 Quick Start

### Pré-requisitos
```bash
✓ Node.js 18+
✓ npm ou pnpm
✓ Conta Firebase (gratuita)
✓ Chave API-Football (opcional)
```

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/LucasRiboldi/BolaoDosManus.git
cd BolaoDosManus
```

2. **Instale as dependências**
```bash
pnpm install
# ou
npm install
```

3. **Configure o Firebase**

   a. Crie um projeto em [Firebase Console](https://console.firebase.google.com/)
   
   b. Habilite:
      - ✅ Authentication (Email/Password)
      - ✅ Firestore Database
      - ✅ Cloud Messaging
   
   c. Copie suas credenciais

4. **Configure variáveis de ambiente**

```bash
# .env.local
EXPO_PUBLIC_FIREBASE_API_KEY=sua_chave_aqui
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
EXPO_PUBLIC_API_FOOTBALL_KEY=sua_chave_api_football
```

5. **Inicie o servidor**
```bash
pnpm dev
# ou
npm run dev
```

6. **Abra em um dispositivo**
```bash
# iOS
pnpm ios

# Android
pnpm android

# Web
pnpm web
```

## 📊 Estrutura de Dados (Firestore)

### Coleção: `users`
```json
{
  "id": "user_id",
  "name": "João Silva",
  "email": "joao@example.com",
  "totalPoints": 250,
  "groupPoints": 150,
  "knockoutPoints": 100,
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

### 1️⃣ Registre-se
```
Tela de Registro → Preencha dados → Criar Conta
```

### 2️⃣ Faça Apostas na Fase de Grupos
```
Aba "Grupos" → Selecione grupo (A-H) → 
Preencha gols → Confirmar Aposta
```

### 3️⃣ Faça Apostas no Mata-Mata
```
Aba "Mata-Mata" → Selecione rodada → 
Escolha vencedor → Confirmar Aposta
```

### 4️⃣ Acompanhe Ranking
```
Aba "Ranking" → Veja posição e pontos → 
Compartilhe no WhatsApp/Instagram
```

### 5️⃣ Revise Histórico
```
Aba "Histórico" → Veja todas as apostas → 
Acompanhe pontos ganhos/perdidos
```

## 📈 Regras de Pontuação

| Cenário | Pontos | Fase |
|---------|--------|------|
| Acerto exato (placar correto) | 10 | Grupos |
| Acerto de vencedor | 5 | Grupos |
| Vencedor correto | 10 | Mata-Mata |
| Resultado incorreto | 0 | Ambas |

## 🔐 Regras de Segurança (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários: apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Apostas: autenticados podem ler/escrever
    match /groupBets/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    match /knockoutBets/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Partidas: apenas leitura
    match /matches/{document=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

## 🔄 Sincronização com API-Football

O app sincroniza automaticamente a cada 5 minutos:
- ⚽ Busca resultados das partidas
- 📊 Atualiza placares
- 🤖 Calcula pontos automaticamente
- 🏅 Atualiza ranking em tempo real

## 👨‍💼 Painel Admin

Apenas emails autorizados podem acessar `/admin`

### Uso:
```
1. Acesse /admin
2. Clique "Selecionar Arquivo JSON"
3. Escolha arquivo com dados das partidas
4. Sistema valida e importa automaticamente
```

### Formato JSON:
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

| Problema | Solução |
|----------|---------|
| API-Football inválida | Verifique chave em `.env.local` |
| Notificações não funcionam | Verifique permissões do SO |
| Firestore não conecta | Valide credenciais e regras |
| Erro de build | Limpe `node_modules` e reinstale |

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento
pnpm dev:metro       # Apenas Metro bundler
pnpm dev:server      # Apenas servidor

# Build
pnpm build           # Build para produção
pnpm start           # Inicia servidor de produção

# Qualidade de código
pnpm lint            # Executa ESLint
pnpm format          # Formata com Prettier
pnpm check           # Verifica tipos TypeScript
pnpm test            # Executa testes

# Banco de dados
pnpm db:push         # Sincroniza schema com banco

# Mobile
pnpm ios             # Abre no iOS
pnpm android         # Abre no Android
pnpm qr              # Gera QR code
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Expo](https://expo.dev/) - Framework React Native
- [Firebase](https://firebase.google.com/) - Backend e autenticação
- [API-Football](https://www.api-football.com/) - Dados de partidas
- [NativeWind](https://www.nativewind.dev/) - Tailwind CSS para React Native
- [React Native](https://reactnative.dev/) - Framework mobile

## 📞 Suporte

- 📧 Email: support@bolao.com
- 🐛 Issues: [GitHub Issues](https://github.com/LucasRiboldi/BolaoDosManus/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/LucasRiboldi/BolaoDosManus/discussions)

## 🎯 Roadmap

- [ ] Integração com redes sociais (login)
- [ ] Sistema de ligas privadas
- [ ] Desafios entre amigos
- [ ] Estatísticas detalhadas
- [ ] Modo offline
- [ ] Suporte a múltiplos idiomas
- [ ] App nativa iOS/Android (EAS Build)

## 📊 Estatísticas

- **Linhas de Código**: ~5000+
- **Componentes**: 20+
- **Telas**: 8
- **Funcionalidades**: 15+
- **Tempo de Desenvolvimento**: Desenvolvido com ❤️

---

<div align="center">

**[⬆ Voltar ao Topo](#-bolão-dos-manus---copa-do-mundo-2026)**

Desenvolvido com ❤️ para a Copa do Mundo 2026

⚽ Boa sorte nas suas apostas! 🍀

[![GitHub Stars](https://img.shields.io/github/stars/LucasRiboldi/BolaoDosManus?style=social)](https://github.com/LucasRiboldi/BolaoDosManus)
[![GitHub Forks](https://img.shields.io/github/forks/LucasRiboldi/BolaoDosManus?style=social)](https://github.com/LucasRiboldi/BolaoDosManus)

</div>
