const express = require("express");
const router = express.Router();

const produtosControllers = require("../controllers/produtos.controllers");

router.post("/produtos", produtosControllers.cadastrarProduto);
router.get("/produtos", produtosControllers.listarProdutos);
router.put("/produtos/:id", produtosControllers.atualizarProduto);
router.delete("/produtos/:id", produtosControllers.deletarProduto);

module.exports = router;