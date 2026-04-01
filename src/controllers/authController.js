const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { username, password } = req.body;

  // validação básica
  if (!username || !password) {
    return res.status(400).json({
      mensagem: "Usuário e senha são obrigatórios"
    });
  }

  // verifica usuário
  if (username !== process.env.ADMIN_USER) {
    return res.status(401).json({
      mensagem: "Credenciais inválidas"
    });
  }

  // verifica senha
  const senhaValida = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!senhaValida) {
    return res.status(401).json({
      mensagem: "Credenciais inválidas"
    });
  }

  // gera token
  const token = jwt.sign(
    { user: username },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({ token });
}

module.exports = { login };