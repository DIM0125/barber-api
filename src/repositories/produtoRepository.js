const { query } = require('../utils/database');
const { select, insertInto, update, where, deleteFrom } = require('../utils/sqlTemplates');

const tableName = 'Produto';

const produtoRepository = {
    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({ id_produto: id }).sql}`;
        const results = await query(sql, [id]);
        return results[0];
    },

    async findAll() {
        const sql = `
            SELECT Produto.*, Usuario.nome as modificado_por
            FROM Produto
            LEFT JOIN Usuario ON Produto.modificado_por = Usuario.id_usuario;
        `;
        let results = await query(sql);
        return results;
    },

    async findByName(nome) {
        const sql = `${select(['*'], tableName)} ${where({ nome }).sql}`;
        const results = await query(sql, [nome]);
        return results[0];
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
