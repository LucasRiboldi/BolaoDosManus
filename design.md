# Design da Interface - Bolão Copa 2026

## Orientação e Uso
- **Orientação:** Retrato (9:16)
- **Uso:** Uma mão
- **Padrão:** Segue as diretrizes do Apple Human Interface Guidelines (HIG) para parecer um aplicativo iOS nativo

## Paleta de Cores
- **Primária:** #0a7ea4 (Azul)
- **Fundo:** #ffffff (Claro) / #151718 (Escuro)
- **Superfície:** #f5f5f5 (Claro) / #1e2022 (Escuro)
- **Texto Principal:** #11181C (Claro) / #ECEDEE (Escuro)
- **Texto Secundário:** #687076 (Claro) / #9BA1A6 (Escuro)
- **Sucesso:** #22C55E
- **Aviso:** #F59E0B
- **Erro:** #EF4444

## Lista de Telas

### 1. Tela de Login
**Conteúdo:**
- Logo/Título do aplicativo
- Campo de email
- Campo de senha
- Botão "Entrar"
- Link "Não tem conta? Registre-se"
- Opção de login com Google (opcional)

**Funcionalidade:**
- Validação de email e senha
- Mensagens de erro claras
- Indicador de carregamento durante autenticação

### 2. Tela de Registro
**Conteúdo:**
- Campo de nome completo
- Campo de email
- Campo de senha
- Campo de confirmação de senha
- Botão "Criar Conta"
- Link "Já tem conta? Faça login"

**Funcionalidade:**
- Validação de campos
- Verificação de senha forte
- Confirmação de email
- Mensagens de erro

### 3. Tela de Ranking (Home)
**Conteúdo:**
- Cabeçalho com saudação do usuário
- Tabela/Lista de ranking com:
  - Posição (1º, 2º, 3º, etc.)
  - Nome do apostador
  - Pontuação total
  - Destaque especial para o usuário atual
- Abas inferiores para navegação

**Funcionalidade:**
- Exibição em tempo real dos pontos
- Atualização automática quando apostas são confirmadas
- Scroll vertical para ver mais apostadores

### 4. Tela de Apostas - Fase de Grupos (Aba 1)
**Conteúdo:**
- Seletor de grupo (A, B, C, D, E, F, G, H, I, J, K, L)
- Tabela de jogos com colunas:
  - Seleção 1
  - Gols (campo editável)
  - vs (separador)
  - Gols (campo editável)
  - Seleção 2
  - Data/Hora do jogo
- Botão "Confirmar Apostas"
- Indicador visual de apostas confirmadas vs pendentes

**Funcionalidade:**
- Edição de gols até o início do jogo
- Validação de números (0-9)
- Confirmação em lote de apostas
- Sincronização com Firebase

### 5. Tela de Apostas - Mata-Mata (Aba 2)
**Conteúdo:**
- Visualização de bracket/chave com:
  - Rodada de 32
  - Oitavas de Final
  - Quartas de Final
  - Semifinais
  - Final
- Seleção de time vencedor em cada partida
- Indicador visual de apostas confirmadas

**Funcionalidade:**
- Seleção de vencedor (apenas um time por partida)
- Atualização em cascata (vencedor avança automaticamente)
- Confirmação de apostas
- Sincronização com Firebase

### 6. Tela de Perfil (Aba 3)
**Conteúdo:**
- Informações do usuário (nome, email)
- Histórico de pontuação
- Configurações (tema claro/escuro)
- Botão "Sair"

**Funcionalidade:**
- Visualização de histórico
- Alternância de tema
- Logout seguro

## Fluxos Principais

### Fluxo de Login/Registro
1. Usuário abre o app → Tela de Login
2. Clica em "Não tem conta?" → Tela de Registro
3. Preenche dados → Cria conta
4. Retorna ao Login → Faz login
5. Acessa Home (Ranking)

### Fluxo de Apostas - Fase de Grupos
1. Usuário em Home → Clica na aba "Grupos"
2. Seleciona um grupo
3. Vê lista de jogos do grupo
4. Preenche gols para cada partida
5. Clica "Confirmar Apostas"
6. Dados salvos no Firebase
7. Pontuação atualizada no ranking

### Fluxo de Apostas - Mata-Mata
1. Usuário em Home → Clica na aba "Mata-Mata"
2. Vê o bracket com os 32 times qualificados
3. Clica em cada partida e seleciona o vencedor
4. Vencedor avança automaticamente para próxima rodada
5. Clica "Confirmar Apostas"
6. Dados salvos no Firebase
7. Pontuação atualizada no ranking

## Considerações de Design
- **Acessibilidade:** Textos com contraste adequado, tamanhos de toque mínimos de 44x44pt
- **Performance:** Listas virtualizadas para grandes quantidades de dados
- **Responsividade:** Adaptável a diferentes tamanhos de tela
- **Feedback Visual:** Indicadores de carregamento, confirmação de ações, animações suaves
