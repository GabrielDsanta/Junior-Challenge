# Desafio Fullstack: Os Anéis de Poder

Este é um projeto FullStack que consiste em uma API backend e um Frontend. Abaixo estão as instruções para configurar e executar o projeto localmente.

## Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker (para rodar o banco de dados PostgreSQL)

## Passo a Passo

### 1. Clonar o repositório

Primeiro, clone o repositório do projeto:

```
git clone git@github.com:GabrielDsanta/Junior-Challenge.git
cd seu-projeto
```

2. Instalar as dependências

```
# No diretório do backend
cd api
npm install

# No diretório do Frontend
cd frontend
npm install
```

3. Configurar os arquivos .env

```
.env no diretório da API Backend (api/.env):
PROJECT_NAME=rings
SERVER_NAME=rings.app

DB_USER=postgres
DB_PASS=postgres
DB_NAME=rings
DB_HOST=postgres-rings

TOKEN_KEY=rings

ENV=development

```

4. Iniciar a API (Backend)

```
# Iniciar a API com Docker
sudo docker network create observability && docker compose up

```

5. Iniciar o Frontend

```
npm run dev

```