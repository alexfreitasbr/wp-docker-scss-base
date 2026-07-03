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

O WordPress lê os arquivos compilados em `wp-content/plugins/curvy/build/`, não em `src/`. Para o bloco aparecer no editor:

1. Compilar os blocos (dentro do plugin)
2. Ativar o plugin **Curvy** em Plugins no admin do WordPress
3. Inserir o bloco no editor (botão **+**, buscar por "Curvy")

> **Atenção:** o `npm run dev` da raiz do projeto compila apenas o SCSS do **tema**. Para blocos, use os comandos abaixo dentro de `wp-content/plugins/curvy`.

| Comando | Função |
|---------|--------|
| `npm run build` | Compila uma vez — suficiente para o bloco aparecer |
| `npm start` | Desenvolvimento com watch — recompila ao salvar |

```bash
cd wp-content/plugins/curvy
npm run build   # primeira vez ou após criar/editar blocos
npm start       # deixe rodando em um terminal separado durante o desenvolvimento
```

### Adicionar novo bloco ao plugin

Para adicionar um bloco sem duplicar `node_modules` nem build:

```bash
cd wp-content/plugins/curvy
npx @wordpress/create-block curvy2 --no-plugin
npm run build
```

## Parar o ambiente

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```
