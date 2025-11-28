const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const alunosRoutes = require("./src/routes/alunos.routes");
const pedidosRoutes = require("./src/routes/pedidos.routes");
const produtosRoutes = require("./src/routes/produtos.routes");
const relatoriosRoutes = require("./src/routes/relatorios.routes");

app.use(express.json());
app.use(cors());

app.use(alunosRoutes);
app.use(pedidosRoutes);
app.use(produtosRoutes);
app.use(relatoriosRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta 3000`);
});