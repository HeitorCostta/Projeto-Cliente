const pool = require("../config/database");

// 🔍 GET ALL
async function getAll() {
  const result = await pool.query("SELECT * FROM propriedades ORDER BY id");
  return result.rows;
}

// 🔍 GET BY ID
async function getById(id) {
  const result = await pool.query(
    "SELECT * FROM propriedades WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// ✅ CREATE
async function create(propriedade) {
  const {
    nomePropriedade,
    cidade,
    estado,
    tamanhoArea,
    culturaPrincipal,
    observacoes,
    produtor_id
  } = propriedade;

  const result = await pool.query(
    `INSERT INTO propriedades
    (nomePropriedade, cidade, estado, tamanhoArea, culturaPrincipal, observacoes, produtor_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [
      nomePropriedade,
      cidade,
      estado,
      tamanhoArea,
      culturaPrincipal,
      observacoes,
      produtor_id
    ]
  );

  return result.rows[0];
}

// ✏️ UPDATE
async function update(id, dados) {
  const query = `
    UPDATE propriedades SET
      nomepropriedade = COALESCE($1, nomepropriedade),
      cidade = COALESCE($2, cidade),
      estado = COALESCE($3, estado),
      tamanhoarea = COALESCE($4, tamanhoarea),
      culturaprincipal = COALESCE($5, culturaprincipal),
      observacoes = COALESCE($6, observacoes)
    WHERE id = $7
    RETURNING *
  `;

  const values = [
    dados.nomePropriedade,
    dados.cidade,
    dados.estado,
    dados.tamanhoArea,
    dados.culturaPrincipal,
    dados.observacoes,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

// ❌ DELETE
async function remove(id) {
  await pool.query("DELETE FROM propriedades WHERE id = $1", [id]);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};