# API de Cadastro de Produtores Rurais

API REST desenvolvida com Node.js para gestão de produtores rurais.

## 🚀 Tecnologias
- Node.js
- Express
- PostgreSQL
- JWT (autenticação)
- Arquitetura MVC

## 🔐 Funcionalidades
- Login com autenticação JWT
- CRUD completo de produtores
- Rotas protegidas

## 📌 Rotas

POST /auth/login  
GET /produtores  
GET /produtores/:id  
POST /produtores (protegida)  
PUT /produtores/:id (protegida)  
DELETE /produtores/:id (protegida)

## 🛠 Como rodar

1. Criar banco com `database.sql`
2. Configurar `.env`
3. Rodar:


npm install
node server.js