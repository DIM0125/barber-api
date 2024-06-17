const {query, withTransaction } = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');
const pool = require('../config/dbConfig');

const tableName = 'Usuario';

const userRepository = {

    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({id_usuario: null}).sql}`;
        const results = await query(sql, id);
        return results[0];
    },

    async findByUsername(username) {
        const sql = `${select(['*'], tableName)} ${where({username: null}).sql}`;
        const results = await query(sql, [username]);
        return results[0];
    },

    async createUsuario(userData, connection) {
        const colunasUsuario = ['nome', 'email', 'senha'];
        if(userData.telefone) {
            colunasUsuario.push('telefone');
        }
        
        const valoresUsuario = [userData.nome, userData.email, userData.senha];
        
        if(userData.telefone) {
            valoresUsuario.push(userData.telefone);
        }
        
        const sqlUsuario = insertInto("Usuario", colunasUsuario);
        const resultsUsuario = await connection.query(sqlUsuario, valoresUsuario);

        return resultsUsuario[0].insertId;
    },

    async createCliente(userData) {
        return withTransaction(async (connection) => {

            const usuarioId = await this.createUsuario(userData, connection);

            const sqlCliente = insertInto("Cliente", ['id_cliente']);
            await connection.query(sqlCliente, usuarioId);

            return usuarioId;
        });
    },

    async createBarbeiro(userData) {
        return withTransaction(async (connection) => {
            
            const usuarioId = await this.createUsuario(userData, connection);

            const colunasBarbeiro = ['id_barbeiro', 'data_contratacao', 'cpf', 'percentual_comissao'];

            const valoresBarbeiro = [usuarioId, userData.data_contratacao, userData.cpf, userData.percentual_comissao];

            const sqlBarbeiro = insertInto("Barbeiro", colunasBarbeiro);
            console.log(sqlBarbeiro, valoresBarbeiro);
            await connection.query(sqlBarbeiro, valoresBarbeiro);

            return usuarioId;
        });
    },

    async createRecepcionista(userData) {
        return withTransaction(async (connection) => {

            const usuarioId = await this.createUsuario(userData, connection);

            const colunasRecepcionista = ['id_recepcionista', 'data_contratacao', 'cpf'];

            const valoresRecepcionista = [usuarioId, userData.data_contratacao, userData.cpf];

            const sqlRecepcionista = insertInto("Recepcionista", colunasRecepcionista);
            await connection.query(sqlRecepcionista, valoresRecepcionista);

            return usuarioId;
        });
    },

    async createGerente(userData) {
        return withTransaction(async (connection) => {

            const usuarioId = await this.createUsuario(userData, connection);

            const colunasGerente = ['id_gerente', 'data_contratacao', 'cpf'];

            const valoresGerente = [usuarioId, userData.data_contratacao, userData.cpf];

            const sqlGerente = insertInto("Gerente", colunasGerente);
            await connection.query(sqlGerente, valoresGerente);

            return usuarioId;
        });
    },

    async deleteById(id) {
        const sql = `${deleteFrom(tableName)} ${where({id_usuario: null}).sql}`;
        await query(sql, id);
        return true;
    }
};

module.exports = userRepository;
