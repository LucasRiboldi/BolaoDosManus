# Bolão Copa 2026 - TODO

## Infraestrutura
- [x] Configurar Firebase (Auth + Firestore)
- [x] Estrutura de dados no Firestore (usuários, apostas, pontuação)
- [x] Integração de autenticação Firebase
- [x] Sincronização de dados em tempo real

## Telas e Navegação
- [x] Tela de Login
- [x] Tela de Registro
- [x] Tela de Home (Ranking)
- [x] Tela de Apostas - Fase de Grupos
- [x] Tela de Apostas - Mata-Mata
- [x] Tela de Perfil
- [x] Configuração de abas inferiores (Tab Bar)

## Funcionalidades - Login e Autenticação
- [x] Validação de email e senha
- [x] Criação de conta
- [x] Login com email/senha
- [x] Logout
- [x] Persistência de sessão
- [ ] Recuperação de senha (opcional)

## Funcionalidades - Ranking
- [x] Exibição de ranking em tempo real
- [ ] Cálculo de pontuação
- [ ] Atualização automática de pontos
- [x] Destaque do usuário atual na lista

## Funcionalidades - Apostas Fase de Grupos
- [x] Carregamento de dados dos 12 grupos
- [x] Exibição de todos os jogos da fase de grupos
- [x] Interface de entrada de gols (tabela tipo Excel)
- [x] Validação de entrada (apenas números 0-9)
- [x] Salvamento de apostas no Firebase
- [x] Indicador visual de apostas confirmadas vs pendentes
- [ ] Bloqueio de edição após início do jogo

## Funcionalidades - Apostas Mata-Mata
- [x] Carregamento de dados do bracket (32 times)
- [x] Visualização do bracket/chave
- [x] Seleção de vencedor em cada partida
- [ ] Atualização em cascata (vencedor avança)
- [x] Salvamento de apostas no Firebase
- [x] Indicador visual de apostas confirmadas

## Funcionalidades - Pontuação
- [ ] Cálculo de pontos na fase de grupos (acerto de placar)
- [ ] Cálculo de pontos no mata-mata (acerto de vencedor)
- [ ] Sistema de pontuação (definir regras)
- [ ] Atualização de ranking em tempo real

## UI/UX
- [x] Paleta de cores definida
- [x] Logo/ícone do aplicativo
- [x] Responsividade para diferentes tamanhos de tela
- [x] Modo claro/escuro
- [x] Indicadores de carregamento
- [x] Mensagens de erro e sucesso
- [ ] Animações suaves

## Testes
- [ ] Teste de login/registro
- [ ] Teste de apostas na fase de grupos
- [ ] Teste de apostas no mata-mata
- [ ] Teste de sincronização com Firebase
- [ ] Teste de cálculo de pontuação
- [ ] Teste de atualização de ranking

## Deploy
- [ ] Gerar APK para Android
- [ ] Testar em dispositivo real
- [ ] Otimização de performance
- [ ] Tratamento de erros de rede
