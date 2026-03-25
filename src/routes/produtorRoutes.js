// routes/produtorRoutes.js
const express = require("express");
const router = express.Router();
const produtorController = require("../controllers/produtorController");

// Listar todos os produtores
router.get("/", produtorController.getAll);

// Buscar um produtor por id
router.get("/:id", produtorController.getById);

// Criar um novo produtor
router.post("/", produtorController.create);

// Atualizar produtor
router.put("/:id", produtorController.update);

// Deletar produtor
router.delete("/:id", produtorController.remove);

module.exports = router;