const express = require("express");
const router = express.Router();

const relatoriosControllers = require("../controllers/relatorios.controllers");

router.get("/relatorios", relatoriosControllers.totalGastoPorAluno);
router.get("/relatorios.pedidos", relatoriosControllers.totalPedidosPorProduto);
router.get("/relatorios.faturamento", relatoriosControllers.totalFaturado);

module.exports = router;