const express = require("express");
const router = express.Router();

const propriedadeController = require("../controllers/propriedadeController");

router.get("/", propriedadeController.getAll);
router.get("/:id", propriedadeController.getById);
router.post("/", propriedadeController.create);
router.put("/:id", propriedadeController.update);
router.delete("/:id", propriedadeController.remove);

module.exports = router;