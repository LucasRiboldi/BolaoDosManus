# 📤 Instruções para Push no GitHub

Este arquivo contém as instruções para fazer push do projeto para o GitHub.

## ✅ Status Atual

O projeto está pronto para ser publicado no GitHub com:

- ✅ Commits locais criados
- ✅ README profissional
- ✅ CONTRIBUTING.md
- ✅ LICENSE (MIT)
- ✅ Todas as funcionalidades implementadas
- ✅ Histórico de apostas
- ✅ Badges para top 3
- ✅ Cálculo automático de pontos

## 🚀 Como Fazer Push para o GitHub

### Opção 1: Via Terminal (Recomendado)

```bash
# 1. Navegue até a pasta do projeto
cd /home/ubuntu/bolao-copa-2026

# 2. Verifique o status do Git
git status

# 3. Verifique os commits
git log --oneline -5

# 4. Faça push para o GitHub
git push -u origin main

# 5. Confirme que foi bem-sucedido
# Você verá algo como:
# Enumerating objects: X, done.
# Counting objects: 100% (X/X), done.
# ...
# To https://github.com/LucasRiboldi/BolaoDosManus.git
#  * [new branch]      main -> main
# Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Opção 2: Via GitHub Desktop (Se Preferir GUI)

1. Abra GitHub Desktop
2. Clique em "File" → "Add Local Repository"
3. Selecione `/home/ubuntu/bolao-copa-2026`
4. Clique em "Publish repository"
5. Confirme os detalhes
6. Clique em "Publish Repository"

### Opção 3: Via GitHub Web

1. Vá para https://github.com/LucasRiboldi/BolaoDosManus
2. Clique em "Upload files"
3. Selecione todos os arquivos do projeto
4. Commit com mensagem: "Initial commit: Bolão dos Manus - Copa 2026"

## 📋 Verificação Pré-Push

Antes de fazer push, verifique:

```bash
# 1. Status dos arquivos
git status
# Deve mostrar: "On branch main" e "nothing to commit"

# 2. Histórico de commits
git log --oneline -10
# Deve mostrar seus 3 commits:
# - docs: adicionar MIT License
# - docs: adicionar README e CONTRIBUTING profissionais
# - Initial commit: Bolão Copa 2026 com todas as funcionalidades

# 3. Remote configurado
git remote -v
# Deve mostrar:
# origin  https://github.com/LucasRiboldi/BolaoDosManus.git (fetch)
# origin  https://github.com/LucasRiboldi/BolaoDosManus.git (push)
```

## 🔐 Autenticação GitHub

Se você receber erro de autenticação:

### Usando Token de Acesso Pessoal (Recomendado)

1. Vá para https://github.com/settings/tokens
2. Clique em "Generate new token"
3. Selecione `repo` (acesso completo ao repositório)
4. Copie o token
5. Use como senha quando solicitado

### Usando SSH (Alternativa)

```bash
# 1. Gere chave SSH
ssh-keygen -t ed25519 -C "seu-email@example.com"

# 2. Adicione a chave ao ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copie a chave pública
cat ~/.ssh/id_ed25519.pub

# 4. Vá para https://github.com/settings/keys
# 5. Clique em "New SSH key"
# 6. Cole a chave pública

# 7. Configure o remote para SSH
git remote set-url origin git@github.com:LucasRiboldi/BolaoDosManus.git

# 8. Teste a conexão
ssh -T git@github.com
```

## ✅ Após o Push

Depois que o push for bem-sucedido:

1. **Verifique no GitHub**
   - Vá para https://github.com/LucasRiboldi/BolaoDosManus
   - Verifique se os arquivos estão lá
   - Verifique se o README está sendo exibido

2. **Configure as Configurações do Repositório**
   - Vá para Settings
   - Configure a branch padrão como `main`
   - Ative "Require pull request reviews" (opcional)
   - Ative "Require status checks to pass" (opcional)

3. **Adicione Tópicos**
   - Vá para "About"
   - Adicione tópicos como:
     - `react-native`
     - `expo`
     - `firebase`
     - `copa-2026`
     - `bolao`
     - `app-mobile`

4. **Ative GitHub Pages** (Opcional)
   - Vá para Settings → Pages
   - Selecione `main` branch
   - Selecione `/root` folder

## 🐛 Troubleshooting

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/LucasRiboldi/BolaoDosManus.git
git push -u origin main
```

### Erro: "fatal: 'origin' does not appear to be a 'git' repository"
```bash
# Verifique se está na pasta correta
pwd
# Deve mostrar: /home/ubuntu/bolao-copa-2026

# Reinicialize o repositório
git init
git remote add origin https://github.com/LucasRiboldi/BolaoDosManus.git
```

### Erro: "Permission denied (publickey)"
```bash
# Configure SSH conforme instruções acima
# Ou use token de acesso pessoal
```

### Erro: "Updates were rejected because the tip of your current branch is behind"
```bash
git pull origin main --rebase
git push origin main
```

## 📊 Próximos Passos

Após publicar no GitHub:

1. **Adicionar CI/CD**
   - Configure GitHub Actions para testes
   - Configure EAS Build para builds automáticas

2. **Configurar Proteção de Branch**
   - Exija pull requests para mudanças
   - Exija revisões de código

3. **Documentação Adicional**
   - Criar wiki do projeto
   - Adicionar exemplos de uso
   - Criar guia de deployment

4. **Engajamento**
   - Adicionar badges de status
   - Configurar discussões
   - Responder issues e PRs

## 🎯 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Remote configurado localmente
- [ ] Commits feitos localmente
- [ ] Push realizado com sucesso
- [ ] Arquivos visíveis no GitHub
- [ ] README exibido corretamente
- [ ] Tópicos adicionados
- [ ] Descrição do repositório preenchida
- [ ] Licença visível
- [ ] CONTRIBUTING.md acessível

## 📞 Suporte

Se tiver dúvidas durante o push:

1. Verifique a [Documentação do GitHub](https://docs.github.com/en/get-started/using-git)
2. Consulte [Git Docs](https://git-scm.com/doc)
3. Abra uma issue no repositório

---

**Boa sorte com seu projeto! 🚀**

⚽ Bolão dos Manus - Copa 2026 🍀
