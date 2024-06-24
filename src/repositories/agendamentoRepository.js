const { query } = require('../utils/database');
const { insertInto } = require('../utils/sqlTemplates');

const agendamentoRepository = {

    async findById(agendamentoId) {
        const sql = `SELECT * FROM Agendamento WHERE id_agendamento = ?`;
        const results = await query(sql, [agendamentoId]);

        const sqlServicos = `SELECT Servico.*, Preco.valor FROM Agendamento_Servicos NATURAL JOIN Servico NATURAL JOIN Preco WHERE id_agendamento = ? AND atual = 1`;
        const resultsServicos = await query(sqlServicos, [agendamentoId]);
        results[0].servicos = resultsServicos;

        const sqlCliente = `SELECT * FROM Cliente JOIN Usuario ON id_usuario = id_cliente WHERE id_cliente = ?`;
        const resultsCliente = await query(sqlCliente, [results[0].id_cliente]);
        results[0].cliente = resultsCliente[0];

        return results[0];
    },

    async findAll() {
        const sql = `
            SELECT a.*, s.id_servico
            FROM Agendamento a
            JOIN Agendamento_Servicos asv on a.id_agendamento = asv.id_agendamento
            JOIN Servico s on asv.id_servico = s.id_servico
        `;
        const results = await query(sql);

        for (const agendamento of results) {
            const sqlServicos = `SELECT Servico.*, Preco.valor FROM Agendamento_Servicos NATURAL JOIN Servico NATURAL JOIN Preco WHERE id_agendamento = ? AND atual = 1`;
            const resultsServicos = await query(sqlServicos, [agendamento.id_agendamento]);
            agendamento.servicos = resultsServicos;

            const sqlCliente = `SELECT * FROM Cliente JOIN Usuario ON id_usuario = id_cliente WHERE id_cliente = ?`;
            const resultsCliente = await query(sqlCliente, [agendamento.id_cliente]);
            agendamento.cliente = resultsCliente[0];
        }
        return results;
    },

    async createAgendamento(agendamentoData) {
        let { id_cliente, id_barbeiro, id_servico, horario_agendamento, status, avaliacao_comentario, avaliacao_nota } = agendamentoData;

        if (!status) {
            status = 'AGENDADO';
        }

        const clientExists = await this.clientExists(id_cliente);
        if (!clientExists) {
            throw new Error(`Cliente com id ${id_cliente} não encontrado.`);
        }

        const barberExists = await this.barberExists(id_barbeiro);
        if (!barberExists) {
            throw new Error(`Barbeiro com id ${id_barbeiro} não encontrado.`);
        }

        if (Array.isArray(id_servico)) {
            for (const servicoId of id_servico) {
                const servicoExists = await this.servicoExists(servicoId);
                if (!servicoExists) {
                    throw new Error(`Serviço com id ${servicoId} não encontrado.`);
                }
            }
        } else {
            const servicoExists = await this.servicoExists(id_servico);
            if (!servicoExists) {
                throw new Error(`Serviço com id ${id_servico} não encontrado.`);
            }
        }

        const sqlInsertAgendamento = `
            INSERT INTO Agendamento (id_barbeiro, id_cliente, horario_agendamento, status, avaliacao_comentario, avaliacao_nota)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await query(sqlInsertAgendamento, [id_barbeiro, id_cliente, horario_agendamento, status, avaliacao_comentario, avaliacao_nota]);
        const agendamentoId = result.insertId;

        if (Array.isArray(id_servico)) {
            for (const servicoId of id_servico) {
                await this.addServicoToAgendamento(agendamentoId, servicoId);
            }
        } else {
            await this.addServicoToAgendamento(agendamentoId, id_servico);
        }

        return agendamentoId;
    },

    async updateAgendamento(agendamentoId, newData) {
        const { id_cliente, id_barbeiro, horario_agendamento, status, avaliacao_comentario, avaliacao_nota } = newData;

        const existingAgendamento = await this.findById(agendamentoId);
        if (!existingAgendamento) {
            throw new Error(`Agendamento com id ${agendamentoId} não encontrado.`);
        }

        const sqlUpdateAgendamento = `
            UPDATE Agendamento
            SET id_barbeiro = ?, id_cliente = ?, horario_agendamento = ?, status = ?, avaliacao_comentario = ?, avaliacao_nota = ?
            WHERE id_agendamento = ?
        `;
        await query(sqlUpdateAgendamento, [id_barbeiro, id_cliente, horario_agendamento, status, avaliacao_comentario, avaliacao_nota, agendamentoId]);
    },

    async deleteAgendamento(agendamentoId) {
        const existingAgendamento = await this.findById(agendamentoId);
        if (!existingAgendamento) {
            throw new Error(`Agendamento com id ${agendamentoId} não encontrado.`);
        }

        const sqlDeleteAgendamento = `DELETE FROM Agendamento WHERE id_agendamento = ?`;
        await query(sqlDeleteAgendamento, [agendamentoId]);
    },

    async getAgendamentosByBarbeiro(barberId) {
        const sql = `SELECT * FROM Agendamento WHERE id_barbeiro = ?`;
        const results = await query(sql, [barberId]);

        for (const agendamento of results) {
            const sqlServicos = `SELECT Servico.*, Preco.valor FROM Agendamento_Servicos NATURAL JOIN Servico NATURAL JOIN Preco WHERE id_agendamento = ? AND atual = 1`;
            const resultsServicos = await query(sqlServicos, [agendamento.id_agendamento]);
            agendamento.servicos = resultsServicos;

            const sqlCliente = `SELECT * FROM Cliente JOIN Usuario ON id_usuario = id_cliente WHERE id_cliente = ?`;
            const resultsCliente = await query(sqlCliente, [agendamento.id_cliente]);
            agendamento.cliente = resultsCliente[0];
        }

        return results;
    },

    async addServicoToAgendamento(agendamentoId, servicoId) {
        const sqlInsertServico = `
            INSERT INTO Agendamento_Servicos (id_agendamento, id_servico)
            VALUES (?, ?)
        `;
        await query(sqlInsertServico, [agendamentoId, servicoId]);
    },

    async clientExists(clientId) {
        const sql = `SELECT id_cliente FROM Cliente WHERE id_cliente = ?`;
        const results = await query(sql, [clientId]);
        return results.length > 0;
    },

    async barberExists(barberId) {
        const sql = `SELECT id_barbeiro FROM Barbeiro WHERE id_barbeiro = ?`;
        const results = await query(sql, [barberId]);
        return results.length > 0;
    },

    async servicoExists(servicoId) {
        const sql = `SELECT id_servico FROM Servico WHERE id_servico = ?`;
        const results = await query(sql, [servicoId]);
        return results.length > 0;
    },

    async getAgendamentosByData(data) {
        const sql = `SELECT * FROM Agendamento WHERE DATE(horario_agendamento) = ?`;
        const results = await query(sql, [data]);

        for (const agendamento of results) {
            const sqlServicos = `SELECT Servico.*, Preco.valor FROM Agendamento_Servicos NATURAL JOIN Servico NATURAL JOIN Preco WHERE id_agendamento = ? AND atual = 1`;
            const resultsServicos = await query(sqlServicos, [agendamento.id_agendamento]);
            agendamento.servicos = resultsServicos;

            const sqlCliente = `SELECT * FROM Cliente JOIN Usuario ON id_usuario = id_cliente WHERE id_cliente = ?`;
            const resultsCliente = await query(sqlCliente, [agendamento.id_cliente]);
            agendamento.cliente = resultsCliente[0];
        }

        return results;
    },

    async getAgendamentosByCliente(clientId) {
        const sql = `SELECT * FROM Agendamento WHERE id_cliente = ?`;
        const results = await query(sql, [clientId]);

        for (const agendamento of results) {
            const sqlServicos = `SELECT Servico.*, Preco.valor FROM Agendamento_Servicos NATURAL JOIN Servico NATURAL JOIN Preco WHERE id_agendamento = ? AND atual = 1`;
            const resultsServicos = await query(sqlServicos, [agendamento.id_agendamento]);
            agendamento.servicos = resultsServicos;

            const sqlCliente = `SELECT * FROM Cliente JOIN Usuario ON id_usuario = id_cliente WHERE id_cliente = ?`;
            const resultsCliente = await query(sqlCliente, [agendamento.id_cliente]);
            agendamento.cliente = resultsCliente[0];
        }

        return results;
    }
};

module.exports = agendamentoRepository;
