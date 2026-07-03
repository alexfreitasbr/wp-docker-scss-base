# wp-docker-tailwind-base

Ambiente WordPress com Docker, tema starter e compilação automática de SCSS.

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose
- [Node.js](https://nodejs.org/) (para compilar SCSS)

## Instalação

```bash
# 1. Configurar ambiente
cp .env.example .env

# 2. Instalar dependências do Sass
npm install

# 3. Compilar SCSS (primeira vez)
npm run sass
```

## Subir o ambiente

```bash
docker compose up -d
```

- WordPress: http://localhost:8080
- phpMyAdmin: http://localhost:8081

## SCSS

| Comando | Função |
|---------|--------|
| `npm run sass` | Compila SCSS uma vez |
| `npm run sass:watch` | Observa alterações e recompila automaticamente |
| `npm run dev` | Atalho para `sass:watch` |

Em desenvolvimento, rode o watch em um terminal separado:

```bash
npm run dev
```

Os arquivos fonte ficam em `wp-content/themes/starter-theme/assets/scss/` e o CSS compilado em `wp-content/themes/starter-theme/assets/css/`.

## Blocos Gutenberg

O WordPress lê os arquivos compilados em `wp-content/plugins/course/build/`, não em `src/`. Para o bloco aparecer no editor:

1. Compilar os blocos (dentro do plugin)
2. Ativar o plugin **Course** em Plugins no admin do WordPress
3. Inserir o bloco no editor (botão **+**, buscar por "Curvy")

> **Atenção:** o `npm run dev` da raiz do projeto compila apenas o SCSS do **tema**. Para blocos, use os comandos abaixo dentro de `wp-content/plugins/course`.

| Comando | Função |
|---------|--------|
| `npm run build` | Compila uma vez — suficiente para o bloco aparecer |
| `npm start` | Desenvolvimento com watch — recompila ao salvar |

```bash
cd wp-content/plugins/course
npm run build   # primeira vez ou após criar/editar blocos
npm start       # deixe rodando em um terminal separado durante o desenvolvimento
```

### Adicionar novo bloco ao plugin

Para adicionar um bloco sem duplicar `node_modules` nem build:

```bash
cd wp-content/plugins/course
npx @wordpress/create-block curvy2 --no-plugin
npm run build
```

## Versionamento (Git)

O `.gitignore` está configurado para versionar apenas o código customizado. Artefatos gerados e conteúdo do WordPress padrão ficam fora do repositório.

### O que sobe no Git

| Pasta | Conteúdo versionado |
|-------|---------------------|
| `wp-content/themes/starter-theme/` | PHP, SCSS e assets (exceto CSS compilado) |
| `wp-content/plugins/course/` | `src/`, `package.json`, `package-lock.json`, PHP |
| `wp-content/plugins/starter-plugin/` | Plugin customizado |
| `wp-content/uploads/` | Apenas `.gitkeep` (estrutura vazia) |

### O que não sobe

| Ignorado | Motivo |
|----------|--------|
| `akismet/`, `hello.php`, temas `twentytwenty*` | Plugins e temas padrão do WordPress |
| `node_modules/` | Dependências — reinstalar com `npm install` |
| `wp-content/plugins/course/build/` | Gerado por `npm run build` |
| `main.css` / `main.css.map` do tema | Gerado por `npm run sass` |
| `wp-content/uploads/*` | Mídia enviada pelo admin |

### Após clonar o repositório

```bash
cp .env.example .env

npm install          # dependências do Sass (tema)
npm run sass         # compila CSS do tema

cd wp-content/plugins/course
npm install          # dependências dos blocos
npm run build        # compila blocos para o WordPress

cd ../../..
docker compose up -d
```

## Parar o ambiente

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```
