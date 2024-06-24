const { query } = require('../utils/database');

const pagamentoRepository = {
    async createPagamento(id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento) {
        const sql = `
            INSERT INTO Pagamento (id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await query(sql, [id_agendamento, id_cliente, id_recepcionista, status, valor, forma_pagamento]);
    },

    async checkClienteExists(id_cliente) {
        const sql = 'SELECT COUNT(*) as count FROM Cliente WHERE id_cliente = ?';
        const result = await query(sql, [id_cliente]);
        return result[0].count > 0;
    },

    async checkAgendamentoExists(id_agendamento) {
        const sql = 'SELECT COUNT(*) as count FROM Agendamento WHERE id_agendamento = ?';
        const result = await query(sql, [id_agendamento]);
        return result[0].count > 0;
    },

    async checkRecepcionistaExists(id_recepcionista) {
        const sql = 'SELECT COUNT(*) as count FROM Recepcionista WHERE id_recepcionista = ?';
        const result = await query(sql, [id_recepcionista]);
        return result[0].count > 0;
    },

    async getAllPagamentos() {
        const sql = 'SELECT * FROM Pagamento';
        return await query(sql);
    },

    async getPagamentoById(id_pagamento) {
        const sql = 'SELECT * FROM Pagamento WHERE id_pagamento = ?';
        const results = await query(sql, [id_pagamento]);
        return results[0];
    },

    async updatePagamento(id_pagamento, status, valor, forma_pagamento) {
        const sql = `
            UPDATE Pagamento
            SET status = ?, valor = ?, forma_pagamento = ?
            WHERE id_pagamento = ?
        `;
        await query(sql, [status, valor, forma_pagamento, id_pagamento]);
    },

    async deletePagamento(id_pagamento) {
        const sql = 'DELETE FROM Pagamento WHERE id_pagamento = ?';
        await query(sql, [id_pagamento]);
    }
};

module.exports = pagamentoRepository;
