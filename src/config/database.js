const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "produtores_db",
  password: "070724",
  port: 5432,
});

module.exports = pool;