const {query} = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');

const tableName = 'Agendamento';

const agendamentoRepository = {
    
    async findById(agendamentoId) {
        const sql = `${select(['*'], tableName)} ${where({id_agendamento: agendamentoId}).sql}`;;
        const results = await query(sql, agendamentoId);
        return results[0];
    },

    async findByBarbeiroId(barbeiroId) {
        const sql = `${select(['*'], tableName)} ${where({id_barbeiro: barbeiroId}).sql}`;;
        const results = await query(sql, [barbeiroId]);
        return results;
    },

    async createAgendamento(agendamentoData) {
        const columns = Object.keys(agendamentoData);
        const values = Object.values(agendamentoData);
        const sql = insertInto(tableName, columns);
        const result = await query(sql, values);
        return result.insertId;
    }
}

module.exports = agendamentoRepository;