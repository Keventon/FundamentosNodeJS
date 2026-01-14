# Fundamentos de Node.js – API HTTP sem frameworks

API REST de estudos que implementa um servidor HTTP do zero, com roteamento próprio, middleware de JSON e persistencia simples em arquivo. O objetivo e mostrar dominio dos fundamentos do Node.js e da web, sem depender de Express ou bibliotecas externas.

## Destaques

- Servidor HTTP nativo com roteamento baseado em RegExp
- Middleware de JSON feito na mão
- CRUD completo de usuários
- Filtro por query string (`search`) em memória
- Persistência em `db.json` via `fs/promises`
- Código organizado e direto ao ponto

## Tecnologias e conceitos

- Node.js (modulos ES)
- `node:http` para servidor web
- `fs/promises` para I/O assincrono
- Roteamento dinâmico com RegExp e grupos nomeados
- Parsing manual de query string

## Como rodar

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3333`.

## Endpoints

### GET /users

Lista usuarios. Aceita filtro por nome ou email via `search`.

- Exemplo: `GET /users?search=ana`

### POST /users

Cria um usuario.

```json
{
  "name": "Ana Clara",
  "email": "ana@email.com"
}
```

### PUT /users/:id

Atualiza um usuario.

```json
{
  "name": "Ana Clara",
  "email": "ana.nova@email.com"
}
```

### DELETE /users/:id

Remove um usuario.

## Exemplos com cURL

```bash
# criar usuario
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana Clara","email":"ana@email.com"}'

# listar usuarios
curl http://localhost:3333/users

# filtrar usuarios
curl "http://localhost:3333/users?search=ana"
```

## Estrutura do projeto

```
.
├── db.json
├── package.json
├── src
│   ├── database.js
│   ├── middlewares
│   │   └── json.js
│   ├── routes.js
│   ├── server.js
│   └── utils
│       ├── build-route-path.js
│       └── extract-query-params.js
```

## Persistência de dados

O arquivo `db.json` é criado automaticamente quando a aplicação grava dados. Ele fica fora do versionamento para manter o repositório limpo e evitar conflitos locais.

## Para recrutadores

Este projeto demonstra domínio real dos fundamentos do backend em Node.js:

- Entendimento profundo do fluxo HTTP (request/response)
- Roteamento e middlewares sem frameworks
- Manipulação de dados e persistência simples
- Código legível, modular e fácil de evoluir
- Solução enxuta, com foco em fundamentos e performance
