const db = require("../data/connection");

const totalGastoPorAluno = async (req, res) => {
    const [rows] = await db.query(`
        SELECT 
            a.nome AS aluno,
            SUM(pr.valor * pd.quantidade) AS total_gasto
        FROM pedidos pd
        JOIN alunos a ON pd.id_aluno = a.id
        JOIN produtos pr ON pd.id_produto = pr.id
        GROUP BY a.nome;
    `);

    res.json(rows).end(); 
};

const totalPedidosPorProduto = async (req, res) => {
    const [rows] = await db.query(`
        SELECT p.nome AS produto, COUNT(*) AS total_pedidos
        FROM pedidos pd
        JOIN produtos p ON pd.id_produto = p.id
        GROUP BY p.nome;
    `);

    res.json(rows).end();
};

const totalFaturado = async (req, res) => {
    const [[row]] = await db.query(`
        SELECT SUM(pr.valor * pd.quantidade) AS total_faturado
        FROM pedidos pd
        JOIN produtos pr ON pd.id_produto = pr.id;
    `);

    res.json(row).end();
};

module.exports = {
    totalGastoPorAluno,
    totalPedidosPorProduto,
    totalFaturado
};