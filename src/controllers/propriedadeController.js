const propriedadeModel = require("../models/propriedadeModel");

// 🔍 GET ALL
async function getAll(req, res) {
  try {
    const propriedades = await propriedadeModel.getAll();
    return res.json(propriedades);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar propriedades" });
  }
}

// 🔍 GET BY ID
async function getById(req, res) {
  try {
    const { id } = req.params;

    const propriedade = await propriedadeModel.getById(id);

    if (!propriedade) {
      return res.status(404).json({ mensagem: "Propriedade não encontrada" });
    }

    return res.json(propriedade);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao buscar propriedade" });
  }
}

// 🔥 CREATE
async function create(req, res) {
  try {
    const {
      nomePropriedade,
      cidade,
      estado,
      tamanhoArea,
      culturaPrincipal,
      observacoes,
      produtor_id
    } = req.body;

    // validação
    if (!nomePropriedade || !cidade || !estado || !tamanhoArea || !culturaPrincipal || !produtor_id) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios não informados"
      });
    }

    if (isNaN(tamanhoArea)) {
      return res.status(400).json({
        mensagem: "Tamanho da área deve ser numérico"
      });
    }

    const novaPropriedade = await propriedadeModel.create({
      nomePropriedade,
      cidade,
      estado,
      tamanhoArea: Number(tamanhoArea),
      culturaPrincipal,
      observacoes,
      produtor_id
    });

    return res.status(201).json(novaPropriedade);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao criar propriedade" });
  }
}

// ✏️ UPDATE
async function update(req, res) {
  try {
    const { id } = req.params;

    const atualizada = await propriedadeModel.update(id, req.body);

    if (!atualizada) {
      return res.status(404).json({ mensagem: "Propriedade não encontrada" });
    }

    return res.json(atualizada);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao atualizar propriedade" });
  }
}

// ❌ DELETE
async function remove(req, res) {
  try {
    const { id } = req.params;

    await propriedadeModel.remove(id);

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao deletar propriedade" });
  }
}

module.exports = { getAll, getById, create, update, remove };