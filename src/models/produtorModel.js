const pool = require("../config/database");

async function getAll() {
  const result = await pool.query("SELECT * FROM produtores ORDER BY id");
  return result.rows;
}

async function getById(id) {
  const result = await pool.query(
    "SELECT * FROM produtores WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function create(produtor) {
  const {
    nomeProdutor,
    nomePropriedade,
    endereco,
    cidade,
    estado,
    telefone,
    email,
    tamanhoArea,
    culturaPrincipal,
    observacoes
  } = produtor;

  const result = await pool.query(
    `INSERT INTO produtores 
    (nomeProdutor, nomePropriedade, endereco, cidade, estado, telefone, email, tamanhoArea, culturaPrincipal, observacoes)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [nomeProdutor, nomePropriedade, endereco, cidade, estado, telefone, email, tamanhoArea, culturaPrincipal, observacoes]
  );

  return result.rows[0];
}

async function update(id, dados) {

  const query = `
  UPDATE produtores
  SET
    nomeprodutor = COALESCE($1, nomeprodutor),
    nomepropriedade = COALESCE($2, nomepropriedade),
    endereco = COALESCE($3, endereco),
    cidade = COALESCE($4, cidade),
    estado = COALESCE($5, estado),
    telefone = COALESCE($6, telefone),
    email = COALESCE($7, email),
    tamanhoarea = COALESCE($8, tamanhoarea),
    culturaprincipal = COALESCE($9, culturaprincipal),
    observacoes = COALESCE($10, observacoes)
  WHERE id = $11
  RETURNING *
  `;

  const values = [
    dados.nomeProdutor,
    dados.nomePropriedade,
    dados.endereco,
    dados.cidade,
    dados.estado,
    dados.telefone,
    dados.email,
    dados.tamanhoArea,
    dados.culturaPrincipal,
    dados.observacoes,
    id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function remove(id) {
  await pool.query("DELETE FROM produtores WHERE id=$1", [id]);
}

module.exports = { getAll, getById, create, update, remove };