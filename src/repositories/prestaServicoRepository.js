const { query } = require('../utils/database');

const prestaServicoRepository = {
    async createPrestaServico(id_barbeiro, id_servico) {
        const checkSql = 'SELECT * FROM Presta_Servico WHERE id_barbeiro = ? AND id_servico = ?';
        const existing = await query(checkSql, [id_barbeiro, id_servico]);
        
        if (existing.length > 0) {
            throw new Error('Esta associação já existe.');
        }
        
        const sql = 'INSERT INTO Presta_Servico (id_barbeiro, id_servico) VALUES (?, ?)';
        await query(sql, [id_barbeiro, id_servico]);
    },

    async getAllPrestaServico() {
        const sql = 'SELECT * FROM Presta_Servico';
        return await query(sql);
    },

    async deletePrestaServico(id_barbeiro, id_servico) {
        const sql = 'DELETE FROM Presta_Servico WHERE id_barbeiro = ? AND id_servico = ?';
        await query(sql, [id_barbeiro, id_servico]);
    }
};

module.exports = prestaServicoRepository;
