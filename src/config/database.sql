DROP TABLE IF EXISTS produtores CASCADE;

CREATE TABLE produtores (
  id SERIAL PRIMARY KEY,
  nomeProdutor VARCHAR(100) NOT NULL,
  endereco TEXT,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  telefone VARCHAR(20),
  email VARCHAR(100),
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE propriedades (
  id SERIAL PRIMARY KEY,
  nomePropriedade VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  tamanhoArea NUMERIC NOT NULL,
  culturaPrincipal VARCHAR(100) NOT NULL,
  observacoes TEXT,
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  produtor_id INTEGER REFERENCES produtores(id) ON DELETE CASCADE
);