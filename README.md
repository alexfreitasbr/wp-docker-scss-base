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

## Parar o ambiente

```bash
docker compose down
```

Para remover também o volume do banco de dados:

```bash
docker compose down -v
```
