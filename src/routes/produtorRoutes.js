// routes/produtorRoutes.js
const express = require("express");
const router = express.Router();
const produtorController = require("../controllers/produtorController");
const authMiddleware = require("../middlewares/authMiddleware");

// Listar todos os produtores
router.get("/", produtorController.getAll);

// Buscar um produtor por id
router.get("/:id", produtorController.getById);

// Criar um novo produtor
router.post("/", authMiddleware, produtorController.create);

// Atualizar produtor
router.put("/:id",authMiddleware, produtorController.update);

// Deletar produtor
router.delete("/:id",authMiddleware, produtorController.remove);

module.exports = router;