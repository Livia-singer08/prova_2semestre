const db = require("../data/connection");

const cadastrarProduto = async (req, res) => {
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        await db.query("INSERT INTO produtos (nome, valor) VALUES (?, ?)", [nome, preco]);
        return res.status(201).json({ message: "Produto cadastrado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM produtos");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    if (!nome || !preco) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        const [result] = await db.query("UPDATE produtos SET nome = ?, preco = ? WHERE id = ?", [nome, preco, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        return res.json({ message: "Produto atualizado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const deletarProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM produtos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        return res.json({ message: "Produto deletado." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    atualizarProduto,
    deletarProduto
};