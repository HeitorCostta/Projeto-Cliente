// controllers/produtorController.js
const produtorModel = require("../models/produtorModel");

async function getAll(req, res) {
  try {
    const produtores = await produtorModel.getAll();
    const lista = produtores.map((valor, index) => ({
      id: valor.id,
      nomeProdutor: valor.nomeProdutor,
      posicao: index + 1
    }));
    return res.status(200).json(lista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar produtores" });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const produtor = await produtorModel.getById(id);

    if (!produtor) {
      return res.status(404).json({ mensagem: "Produtor não encontrado" });
    }

    return res.status(200).json(produtor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao buscar produtor" });
  }
}

async function create(req, res) {
  try {
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
    } = req.body;

    // validação simples
    if (!nomeProdutor || !nomePropriedade || !cidade || !estado || !tamanhoArea || !culturaPrincipal) {
      return res.status(400).json({ mensagem: "Campos obrigatórios não informados" });
    }

    if (isNaN(tamanhoArea)) {
      return res.status(400).json({ mensagem: "Tamanho da área deve ser numérico" });
    }

    const novoProdutor = await produtorModel.create({
      nomeProdutor,
      nomePropriedade,
      endereco,
      cidade,
      estado,
      telefone,
      email,
      tamanhoArea: Number(tamanhoArea),
      culturaPrincipal,
      observacoes
    });

    return res.status(201).json(novoProdutor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao criar produtor" });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;

    const produtorExistente = await produtorModel.getById(id);
    if (!produtorExistente) {
      return res.status(404).json({ mensagem: "Produtor não encontrado" });
    }

    // impedir alteração de campos protegidos
    if (req.body.id || req.body.dataCadastro) {
      return res.status(400).json({ 
        mensagem: "Não é permitido alterar ID ou data de cadastro" 
      });
    }

    if (req.body.tamanhoArea !== undefined && isNaN(req.body.tamanhoArea)) {
      return res.status(400).json({ mensagem: "Tamanho da área deve ser numérico" });
    }

    const atualizado = await produtorModel.update(id, req.body);
    return res.status(200).json(atualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao atualizar produtor" });
  }
}

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