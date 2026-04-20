const pool = require("../config/database");

// 🔍 GET ALL COM PROPRIEDADES (JOIN)
async function getAllComPropriedades() {
  const result = await pool.query(`
    SELECT 
      p.id as produtor_id,
      p.nomeprodutor,
      p.endereco,
      p.cidade as produtor_cidade,
      p.estado as produtor_estado,
      p.telefone,
      p.email,
      p.datacadastro,

      pr.id as propriedade_id,
      pr.nomepropriedade,
      pr.cidade as propriedade_cidade,
      pr.estado as propriedade_estado,
      pr.tamanhoarea,
      pr.culturaprincipal,
      pr.observacoes

    FROM produtores p
    LEFT JOIN propriedades pr 
      ON pr.produtor_id = p.id

    ORDER BY p.id;
  `);

  return result.rows;
}

// 🔍 GET BY ID
async function getById(id) {
  const result = await pool.query(
    "SELECT * FROM produtores WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// 🔍 BUSCAR POR NOME
async function findByNome(nome) {
  const result = await pool.query(
    "SELECT * FROM produtores WHERE nomeprodutor = $1",
    [nome]
  );
  return result.rows[0];
}

// ✅ CREATE
async function create(produtor) {
  const {
    nomeProdutor,
    endereco,
    cidade,
    estado,
    telefone,
    email
  } = produtor;

  const result = await pool.query(
    `INSERT INTO produtores 
    (nomeProdutor, endereco, cidade, estado, telefone, email)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nomeProdutor, endereco, cidade, estado, telefone, email]
  );

  return result.rows[0];
}

// ✏️ UPDATE
async function update(id, dados) {
  const query = `
    UPDATE produtores
    SET
      nomeprodutor = COALESCE($1, nomeprodutor),
      endereco = COALESCE($2, endereco),
      cidade = COALESCE($3, cidade),
      estado = COALESCE($4, estado),
      telefone = COALESCE($5, telefone),
      email = COALESCE($6, email)
    WHERE id = $7
    RETURNING *
  `;

  const values = [
    dados.nomeProdutor,
    dados.endereco,
    dados.cidade,
    dados.estado,
    dados.telefone,
    dados.email,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

// ❌ DELETE
async function remove(id) {
  await pool.query("DELETE FROM produtores WHERE id = $1", [id]);
}

module.exports = {
  getAllComPropriedades,
  getById,
  findByNome,
  create,
  update,
  remove
};