# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Bolão dos Manus**! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugestões de Funcionalidades](#sugestões-de-funcionalidades)

## 📜 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente inclusivo e respeitoso.

### Nossa Promessa

Nos comprometemos a fornecer um ambiente acolhedor e inspirador para todos, independentemente de:
- Idade
- Tamanho do corpo
- Deficiência
- Etnia
- Identidade de gênero
- Nível de experiência
- Nacionalidade
- Aparência pessoal
- Raça
- Religião
- Identidade e orientação sexual

### Nossos Padrões

Exemplos de comportamento que contribuem para criar um ambiente positivo incluem:
- Usar linguagem acolhedora e inclusiva
- Ser respeitoso com pontos de vista e experiências diferentes
- Aceitar críticas construtivas com graça
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

## 🚀 Como Começar

### 1. Fork o Repositório

```bash
# Visite https://github.com/LucasRiboldi/BolaoDosManus
# Clique no botão "Fork" no canto superior direito
```

### 2. Clone seu Fork

```bash
git clone https://github.com/seu-usuario/BolaoDosManus.git
cd BolaoDosManus
```

### 3. Adicione o Remote Upstream

```bash
git remote add upstream https://github.com/LucasRiboldi/BolaoDosManus.git
git fetch upstream
```

### 4. Crie uma Branch

```bash
# Atualize a branch main
git checkout main
git pull upstream main

# Crie uma nova branch para sua feature
git checkout -b feature/sua-feature-aqui
```

## 🔧 Processo de Desenvolvimento

### Instalação Local

```bash
# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Estrutura de Branches

```
main                          # Branch de produção (estável)
├── feature/nova-funcionalidade
├── fix/correcao-bug
└── docs/atualizacao-documentacao
```

### Naming Convention

- **Features**: `feature/descricao-da-feature`
- **Bugfixes**: `fix/descricao-do-bug`
- **Documentação**: `docs/descricao`
- **Refatoração**: `refactor/descricao`
- **Performance**: `perf/descricao`

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM: Tipos explícitos
interface User {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
}

const getUser = (id: string): Promise<User> => {
  // ...
};

// ❌ RUIM: Tipos implícitos
const getUser = (id) => {
  // ...
};
```

### React/React Native

```typescript
// ✅ BOM: Componente bem estruturado
interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="bg-primary rounded-lg p-4"
    >
      <Text className="text-white font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}

// ❌ RUIM: Props sem tipagem
export function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
}
```

### Nomeação

```typescript
// ✅ BOM
const getUserBets = async (userId: string) => {};
const isValidEmail = (email: string): boolean => {};
const calculateTotalPoints = (bets: Bet[]): number => {};

// ❌ RUIM
const get = async (id) => {};
const valid = (email) => {};
const calc = (b) => {};
```

### Comentários

```typescript
// ✅ BOM: Comentários significativos
/**
 * Calcula os pontos de uma aposta de grupos
 * @param bet - A aposta do usuário
 * @param match - A partida realizada
 * @returns Pontos ganhos (0, 5 ou 10)
 */
export const calculateGroupBetPoints = (bet: GroupBet, match: Match): number => {
  // ...
};

// ❌ RUIM: Comentários óbvios
// incrementa i
i++;
```

## 📝 Commits

### Formato de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodapé>
```

### Tipos

- `feat`: Uma nova funcionalidade
- `fix`: Correção de um bug
- `docs`: Mudanças na documentação
- `style`: Mudanças que não afetam o código (formatação, etc)
- `refactor`: Refatoração de código sem mudanças de funcionalidade
- `perf`: Melhoria de performance
- `test`: Adição ou modificação de testes
- `chore`: Mudanças em dependências, build, etc

### Exemplos

```bash
# Feature
git commit -m "feat(ranking): adicionar badges para top 3 colocados"

# Bugfix
git commit -m "fix(auth): corrigir erro de login com email inválido"

# Documentação
git commit -m "docs(readme): atualizar instruções de instalação"

# Com corpo
git commit -m "feat(scoring): implementar cálculo automático de pontos

- Sincroniza com API-Football
- Atualiza ranking em tempo real
- Envia notificações de mudanças

Closes #123"
```

## 🔄 Pull Requests

### Antes de Submeter

1. **Atualize sua branch com o upstream**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Teste suas mudanças**
```bash
pnpm lint
pnpm format
pnpm check
pnpm test
```

3. **Commit suas mudanças**
```bash
git add .
git commit -m "feat: sua mensagem aqui"
```

4. **Push para seu fork**
```bash
git push origin feature/sua-feature
```

### Criando um Pull Request

1. Vá para https://github.com/LucasRiboldi/BolaoDosManus
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Preencha o template do PR

### Template de PR

```markdown
## 📝 Descrição

Descreva brevemente suas mudanças.

## 🎯 Tipo de Mudança

- [ ] 🐛 Bugfix
- [ ] ✨ Nova funcionalidade
- [ ] 📚 Documentação
- [ ] 🔄 Refatoração
- [ ] ⚡ Performance

## 🧪 Como Testar

Descreva os passos para testar suas mudanças:

1. Passo 1
2. Passo 2
3. Passo 3

## ✅ Checklist

- [ ] Meu código segue o padrão de estilo do projeto
- [ ] Executei `pnpm lint` e `pnpm format`
- [ ] Adicionei testes para minhas mudanças
- [ ] Meus commits têm mensagens descritivas
- [ ] Atualizei a documentação

## 📸 Screenshots (se aplicável)

Adicione screenshots de mudanças na UI.

## 🔗 Issues Relacionadas

Closes #123
```

## 🐛 Reportando Bugs

### Antes de Reportar

- Verifique se o bug já foi reportado
- Tente reproduzir em uma versão recente
- Colete informações de debug

### Como Reportar

1. Vá para [Issues](https://github.com/LucasRiboldi/BolaoDosManus/issues)
2. Clique em "New Issue"
3. Preencha o template

### Template de Bug

```markdown
## 🐛 Descrição do Bug

Descrição clara do que é o bug.

## 🔄 Como Reproduzir

1. Passo 1
2. Passo 2
3. Passo 3

## ✅ Comportamento Esperado

O que deveria acontecer.

## ❌ Comportamento Atual

O que está acontecendo.

## 📸 Screenshots

Adicione screenshots se possível.

## 📋 Informações do Ambiente

- **OS**: [ex: iOS, Android, Web]
- **Versão do App**: [ex: 1.0.0]
- **Node**: [ex: 18.0.0]
- **pnpm**: [ex: 9.0.0]

## 📝 Logs

Adicione qualquer log relevante.
```

## 💡 Sugestões de Funcionalidades

### Antes de Sugerir

- Verifique se a funcionalidade já foi sugerida
- Considere se é útil para a maioria dos usuários

### Como Sugerir

1. Vá para [Issues](https://github.com/LucasRiboldi/BolaoDosManus/issues)
2. Clique em "New Issue"
3. Selecione "Feature request"
4. Preencha o template

### Template de Feature

```markdown
## 🎯 Descrição da Feature

Descrição clara da funcionalidade.

## 💡 Motivação

Por que essa funcionalidade seria útil?

## 📋 Casos de Uso

- Caso de uso 1
- Caso de uso 2

## 🔄 Alternativas Consideradas

Outras soluções que você considerou.

## 📝 Contexto Adicional

Qualquer informação adicional.
```

## 🎓 Recursos Úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do Firebase](https://firebase.google.com/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## ❓ Dúvidas?

- 📧 Email: support@bolao.com
- 💬 Discussões: [GitHub Discussions](https://github.com/LucasRiboldi/BolaoDosManus/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/LucasRiboldi/BolaoDosManus/issues)

---

Obrigado por contribuir! 🙏

⚽ Boa sorte! 🍀
