const {query} = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');

const tableName = 'Usuario';

const userRepository = {
    /**
     * Busca um usuário por ID.
     *
     * @param {number} id - O ID do usuário.
     * @returns {Promise<Object>} - Os dados do usuário.
     */
    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({id}).sql}`;
        const results = await query(sql, [id]);
        return results[0];
    },

    /**
     * Busca um usuário por nome de usuário.
     *
     * @param {string} username - O nome de usuário.
     * @returns {Promise<Object>} - Os dados do usuário.
     */
    async findByUsername(username) {
        const sql = `${select(['*'], tableName)} ${where({username}).sql}`;
        const results = await query(sql, [username]);
        return results[0];
    },

    /**
     * Busca os barbeiros cadastrados.
     *
     * @returns {Promise<Object>} - Os dados do usuário.
     */
    async findBarbers() {
        const userColumns = ['users.id', 'users.name', 'users.email'];
        const allColumns = [...userColumns]; // adiciona todas as colunas de usuários e se necessário adicione as colunas de perfis

        const joins = [
            {type: 'inner', tableName: 'user_role', on: 'users.id = user_role.user_id'},
        ];

        const sql = `${select(allColumns, 'users')} ${join(joins)} ${where({'user_role.code': 'BARBER'}).sql}`;
        return await query(sql);
    },

    /**
     * Cria um novo usuário.
     * @param {Object} userData - Os dados do novo usuário.
     * @returns {Promise<number>} - O ID do novo usuário.
     */
    async create(userData) {
        const columns = Object.keys(userData);
        const values = Object.values(userData);
        const sql = insertInto(tableName, columns);
        const result = await query(sql, values);
        return result.insertId;
    },

    /**
     * Atualiza os dados de um usuário.
     * @param {number} id - O ID do usuário a ser atualizado.
     * @param {Object} userData - Os dados a serem atualizados.
     * @returns {Promise<boolean>} - Resultado da operação.
     */
    async updateById(id, userData) {
        const {sql, values} = update(tableName, userData);
        const condition = where({id});
        const finalSql = `${sql} ${condition.sql}`;
        const finalValues = [...values, id];
        await query(finalSql, finalValues);
        return true;
    },

    /**
     * Exclui um usuário.
     * @param {number} id - O ID do usuário a ser excluído.
     * @returns {Promise<boolean>} - Resultado da operação.
     */
    async deleteById(id) {
        const sql = `${deleteFrom(tableName)} ${where({id}).sql}`;
        await query(sql, [id]);
        return true;
    }
};

module.exports = userRepository;
