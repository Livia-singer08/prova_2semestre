const db = require("../data/connection");

const cadastrarPedido = async (req, res) => {
    const { id_aluno, id_produto, quantidade } = req.body;

    if (!id_aluno || !id_produto || !quantidade) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        await db.query("INSERT INTO pedidos (id_aluno, id_produto, quantidade) VALUES (?, ?, ?)", [id_aluno, id_produto, quantidade]);

        return res.status(201).json({ message: "Pedido criado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const listarPedidos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM pedidos");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const atualizarPedido = async (req, res) => {
    const { id } = req.params;
    const { id_aluno, id_produto, quantidade } = req.body;

    if (!id_aluno || !id_produto || !quantidade) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        const [produto] = await db.query("SELECT * FROM produtos WHERE id = ?", [id_produto]);

        if (produto.length === 0) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        const [result] = await db.query("UPDATE pedidos SET id_aluno = ?, id_produto = ?, quantidade = ? WHERE id = ?", [id_aluno, id_produto, quantidade, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.json({ message: "Pedido atualizado." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const deletarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM pedidos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.json({ message: "Pedido deletado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

module.exports = {
    cadastrarPedido,
    listarPedidos,
    atualizarPedido,
    deletarPedido
};