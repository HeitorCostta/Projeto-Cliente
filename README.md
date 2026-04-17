# 🌾 Sistema de Gestão de Produtores Rurais

Sistema completo para gestão de produtores rurais e suas propriedades, com autenticação de usuários e controle de dados.

---

## 🚀 Tecnologias

* Node.js
* Express
* PostgreSQL
* JWT (autenticação)
* JavaScript (Vanilla)
* HTML e CSS
* Arquitetura MVC

---

## 🔐 Funcionalidades

### 👤 Autenticação

* Login com JWT
* Rotas protegidas

### 🌾 Produtores

* Cadastro de produtores
* Listagem com propriedades associadas
* Edição e exclusão

### 🏡 Propriedades

* Cadastro de múltiplas propriedades por produtor
* Edição de propriedades individuais
* Exclusão independente de propriedades

### 🔎 Extras

* Filtro por nome e cidade
* Interface simples e funcional
* Exibição de data de cadastro

---

## 📌 Rotas da API

### 🔐 Auth

POST /auth/login

### 👤 Produtores

GET /produtores
GET /produtores/:id
POST /produtores
PUT /produtores/:id
DELETE /produtores/:id

### 🏡 Propriedades

GET /propriedades
POST /propriedades
PUT /propriedades/:id
DELETE /propriedades/:id

---

## 🛠 Como rodar o projeto

### 1. Clone o repositório

git clone https://github.com/HeitorCostta/Projeto-Cliente.git

### 2. Acesse a pasta

cd Projeto-Cliente

### 3. Instale as dependências

npm install

### 4. Configure o arquivo .env

Crie um arquivo `.env` na raiz com:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
JWT_SECRET=sua_chave_secreta

### 5. Crie o banco de dados

Execute o script `database.sql`

### 6. Rode o servidor

node server.js

---

## 💻 Frontend

O sistema conta com uma interface simples em HTML, CSS e JavaScript puro.

### Funcionalidades:

* Login
* Dashboard com listagem de produtores
* Cadastro e gerenciamento de propriedades
* Filtros dinâmicos

---


## 📌 Melhorias futuras

* Paginação de resultados
* Deploy em produção
* Melhorias no design (UI/UX)
* Validações mais robustas
* Responsividade aprimorada

Copie o arquivo .env.example e renomeie para .env

---

## 👨‍💻 Autor

Desenvolvido por Heitor Costa🚀
