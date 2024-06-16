const {query} = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');

const tableName = 'Produto';

const produtoRepository = {

    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({id}).sql}`;
        const results = await query(sql, [id]);
        return results[0];
    },

    async findAll() {
        const sql = `${select(['*'], tableName)}`;
        const results = await query(sql);
        return results;
    },

    async create(productData) {
        const columns = Object.keys(productData);
        const values = Object.values(productData);
        const sql = insertInto(tableName, columns);
        const result = await query(sql, values);
        return result.insertId;
    }
}