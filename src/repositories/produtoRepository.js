const { query } = require('../utils/database');
const { select, insertInto, update, where, deleteFrom } = require('../utils/sqlTemplates');
const { findGerenteById } = require('./userRepository');

const tableName = 'Produto';

const produtoRepository = {

    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({ id_produto: id }).sql}`;
        const results = await query(sql, [id]);
        return results[0];
    },

    async findAll() {
        const sql = `SELECT produto.*, usuario.nome as modificado_por
                    FROM Produto JOIN
                    Gerente ON produto.modificado_por = gerente.id_gerente JOIN
                    Usuario ON id_gerente = id_usuario`;
        let results = await query(sql);

        return results;
    },

    async create(productData) {
        const columns = Object.keys(productData);
        const values = Object.values(productData);
        const sql = insertInto(tableName, columns);
        const result = await query(sql, values);
        return result.insertId;
    },

    async update(id, productData) {
        const { sql, values } = update(tableName, productData, { id_produto: id });
        const result = await query(sql, values);
        return result.affectedRows;
    },

    async delete(id) {
        const sql = `${deleteFrom(tableName)} ${where({ id_produto: id }).sql}`;
        const result = await query(sql, [id]);
        return result.affectedRows;
    }
};

module.exports = produtoRepository;
