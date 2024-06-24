const { query } = require('../utils/database');

const precoRepository = {
    async createPreco(id_servico, preco) {
        const today = new Date().toISOString().slice(0, 10);
        
        // Desativa o preço atual do serviço
        await this.desativarPrecoAtual(id_servico);

        const sql = 'INSERT INTO Preco (id_servico, atual, valor, data) VALUES (?, ?, ?, ?)';
        await query(sql, [id_servico, 1, preco, today]);
    },

    async updatePreco(precoId, novoPreco) {
        const today = new Date().toISOString().slice(0, 10);
        const sqlDesativarPrecoAntigo = 'UPDATE Preco SET atual = 0 WHERE id_servico = (SELECT id_servico FROM Preco WHERE id_preco = ?)';
        await query(sqlDesativarPrecoAntigo, [precoId]);

        const sqlInserirNovoPreco = 'INSERT INTO Preco (id_servico, atual, valor, data) VALUES ((SELECT id_servico FROM Preco WHERE id_preco = ?), ?, ?, ?)';
        await query(sqlInserirNovoPreco, [precoId, 1, novoPreco, today]);
    },

    async getAllPrecos() {
        const sql = 'SELECT * FROM Preco';
        return await query(sql);
    },

    async servicoExists(id_servico) {
        const sql = 'SELECT 1 FROM Servico WHERE id_servico = ?';
        const result = await query(sql, [id_servico]);
        return result.length > 0;
    },

    async precoExists(id_servico, preco) {
        const sql = 'SELECT 1 FROM Preco WHERE id_servico = ? AND valor = ?';
        const result = await query(sql, [id_servico, preco]);
        return result.length > 0;
    },

    async precoExistsById(precoId) {
        const sql = 'SELECT 1 FROM Preco WHERE id_preco = ?';
        const result = await query(sql, [precoId]);
        return result.length > 0;
    },

    async deletePreco(precoId) {
        const sql = 'DELETE FROM Preco WHERE id_preco = ?';
        await query(sql, [precoId]);
    },

    async desativarPrecoAtual(id_servico) {
        const sql = 'UPDATE Preco SET atual = 0 WHERE id_servico = ? AND atual = 1';
        await query(sql, [id_servico]);
    }
};

module.exports = precoRepository;
