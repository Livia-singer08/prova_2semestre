const express = require("express");
const router = express.Router();

const alunosControllers = require("../controllers/alunos.controllers");

router.post("/alunos", alunosControllers.cadastrarAluno);
router.get("/alunos", alunosControllers.listarAlunos);
router.put("/alunos/:id", alunosControllers.atualizarAluno);
router.delete("/alunos/:id", alunosControllers.deletarAluno);

module.exports = router;