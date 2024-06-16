const {query} = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');
const { findById } = require('./userRepository');

const tableName = 'Servico';

const servicoRepository = {

    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({id}).sql}`;
        const results = await query(sql, [id]);
        return results[0];
    },

    
}