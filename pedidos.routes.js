const express = require("express");
const router = express.Router();

const pedidosControllers = require("../controllers/pedidos.controllers");

router.post("/pedidos", pedidosControllers.cadastrarPedido);
router.get("/pedidos", pedidosControllers.listarPedidos);
router.put("/pedidos/:id", pedidosControllers.atualizarPedido);
router.delete("/pedidos/:id", pedidosControllers.deletarPedido);

module.exports = router;