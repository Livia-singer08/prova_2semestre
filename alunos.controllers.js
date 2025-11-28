const db = require("../data/connection");

const cadastrarAluno = async (req, res) => {
    const { nome, turma } = req.body;

    if (!nome || !turma) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        await db.query("INSERT INTO alunos (nome, turma) VALUES (?, ?)", [nome, turma]);
        return res.status(201).json({ message: "Aluno cadastrado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const listarAlunos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM alunos");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const atualizarAluno = async (req, res) => {
    const { id } = req.params;
    const { nome, turma } = req.body;

    if (!nome || !turma) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }

    try {
        const [result] = await db.query("UPDATE alunos SET nome = ?, turma = ? WHERE id = ?", [nome, turma, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }

        return res.json({ message: "Aluno atualizado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

const deletarAluno = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM alunos WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Aluno não encontrado." });
        }

        return res.json({ message: "Aluno deletado." });
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor." });
    }
};

module.exports = {
    cadastrarAluno,
    listarAlunos,
    atualizarAluno,
    deletarAluno
};