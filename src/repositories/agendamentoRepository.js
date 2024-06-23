const { query } = require('../utils/database');
const { insertInto } = require('../utils/sqlTemplates');

const agendamentoRepository = {

    async findById(agendamentoId) {
        const sql = `SELECT * FROM Agendamento WHERE id_agendamento = ?`;
        const results = await query(sql, [agendamentoId]);
        return results[0];
    },

    async findAll() {
        const sql = `SELECT * FROM Agendamento`;
        const results = await query(sql);
        return results;
    },

    async createAgendamento(agendamentoData) {
        const { id_cliente, id_barbeiro, id_servico, horario_agendamento, status, avaliacao_comentario, avaliacao_nota } = agendamentoData;

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
        return await query(sql, [barberId]);
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
    }
};

module.exports = agendamentoRepository;
