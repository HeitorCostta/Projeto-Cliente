CREATE DATABASE produtores_db;

\c produtores_db

CREATE TABLE produtores (
  id SERIAL PRIMARY KEY,
  nomeProdutor VARCHAR(100) NOT NULL,
  nomePropriedade VARCHAR(100) NOT NULL,
  endereco TEXT,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100),
  tamanhoArea NUMERIC NOT NULL,
  culturaPrincipal VARCHAR(100) NOT NULL,
  observacoes TEXT,
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);