const produtorModel = require("../models/produtorModel");

// 🔍 GET ALL (COM PROPRIEDADES)
async function getAll(req, res) {
  try {
    const dados = await produtorModel.getAllComPropriedades();

    const produtores = {};

    dados.forEach(row => {
      if (!produtores[row.produtor_id]) {
        produtores[row.produtor_id] = {
          id: row.produtor_id,
          nome: row.nomeprodutor,
          endereco: row.endereco,
          cidade: row.produtor_cidade,
          estado: row.produtor_estado,
          telefone: row.telefone,
          email: row.email,
          dataCadastro: row.datacadastro,
          propriedades: []
        };
      }

      if (row.propriedade_id) {
        produtores[row.produtor_id].propriedades.push({
          id: row.propriedade_id,
          nome: row.nomepropriedade,
          cidade: row.propriedade_cidade,
          estado: row.propriedade_estado,
          tamanhoArea: row.tamanhoarea,
          cultura: row.culturaprincipal,
          observacoes: row.observacoes
        });
      }
    });

    return res.json(Object.values(produtores));

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar produtores" });
  }
}

// 🔍 GET BY ID
async function getById(req, res) {
  try {
    const { id } = req.params;

    const produtor = await produtorModel.getById(id);

    if (!produtor) {
      return res.status(404).json({ mensagem: "Produtor não encontrado" });
    }

    return res.json(produtor);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao buscar produtor" });
  }
}

// ✅ CREATE
async function create(req, res) {
  try {
    const {
      nomeProdutor,
      endereco,
      cidade,
      estado,
      telefone,
      email
    } = req.body;

    if (!nomeProdutor || !cidade || !estado) {
      return res.status(400).json({
        mensagem: "Campos obrigatórios não informados"
      });
    }

    const novoProdutor = await produtorModel.create({
      nomeProdutor,
      endereco,
      cidade,
      estado,
      telefone,
      email
    });

    return res.status(201).json(novoProdutor);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao criar produtor" });
  }
}

// ✏️ UPDATE
async function update(req, res) {
  try {
    const { id } = req.params;

    const produtorExistente = await produtorModel.getById(id);

    if (!produtorExistente) {
      return res.status(404).json({ mensagem: "Produtor não encontrado" });
    }

    const atualizado = await produtorModel.update(id, req.body);

    return res.json(atualizado);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao atualizar produtor" });
  }
}

// ❌ DELETE
async function remove(req, res) {
  try {
    const { id } = req.params;

    const produtorExistente = await produtorModel.getById(id);

    if (!produtorExistente) {
      return res.status(404).json({ mensagem: "Produtor não encontrado" });
    }

    await produtorModel.remove(id);

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao deletar produtor" });
  }
}

module.exports = { getAll, getById, create, update, remove };