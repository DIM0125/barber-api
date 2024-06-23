const {query, withTransaction} = require('../utils/database');
const {select, insertInto, update, where, deleteFrom, join} = require('../utils/sqlTemplates');
const pool = require('../config/dbConfig');
const {findByBarbeiroId} = require('./agendamentoRepository');

const tableName = 'Usuario';

const userRepository = {

    async findById(id) {
        const sql = `${select(['*'], tableName)} ${where({id_usuario: null}).sql}`;
        const results = await query(sql, id);
        return results[0];
    },

    async saveWorkSchedule(workSchedule) {
        const sqlInsert = `
            INSERT INTO Barbeiro_Horarios (id_barbeiro, dia_da_semana, horario_inicio, horario_fim)
            VALUES (?, ?, ?, ?)
        `;
        const {id_barbeiro, dia_da_semana, horario_inicio, horario_fim} = workSchedule;
        const result = await query(sqlInsert, [id_barbeiro, dia_da_semana, horario_inicio, horario_fim]);

        const insertedId = result.insertId;

        const sqlSelect = `
            SELECT *
            FROM Barbeiro_Horarios
            WHERE id_horario = ?
        `;
        const savedItem = await query(sqlSelect, [insertedId]);

        return savedItem[0];
    },

    async findGerenteById(id) {
        const sql = `SELECT *
                     FROM Usuario
                              JOIN Gerente ON id_usuario = id_gerente
                     WHERE id_gerente = ?`;
        const result = await query(sql, id);
        return result[0];
    },

    async findByBarbeiroById(id) {
        const sql = `SELECT *
                     FROM Usuario
                              JOIN Barbeiro ON id_usuario = id_barbeiro
                     WHERE id_barbeiro = ?`;
        const result = await query(sql, id);
        return result[0];
    },

    async findRecepcionistaById(id) {
        const sql = `SELECT *
                     FROM Usuario
                              JOIN Recepcionista ON id_usuario = id_recepcionista
                     WHERE id_recepcionista = ?`;
        const result = await query(sql, id);
        return result[0];
    },

    async findClients() {
        const sql = `SELECT * FROM Usuario JOIN Cliente ON id_usuario = id_cliente`;
        return await query(sql);
    },

    async findBarbers() {
        const sql = `SELECT * FROM Usuario JOIN Barbeiro ON id_usuario = id_barbeiro`;
        return await query(sql);
    },

    async findReceptionists() {
        const sql = `SELECT * FROM Usuario JOIN Recepcionista ON id_usuario = id_recepcionista`;
        return await query(sql);
    },

    async findManagers() {
        const sql = `SELECT * FROM Usuario JOIN Gerente ON id_usuario = id_gerente`;
        return await query(sql);
    },

    async existsByEmail(email) {
        const sql = `${select(['id_usuario'], tableName)} ${where({email: null}).sql}`;
        const results = await query(sql, email);
        return results.length > 0;
    },

    async existsByTelefone(telefone) {
        const sql = `${select(['id_usuario'], tableName)} ${where({telefone: null}).sql}`;
        const results = await query(sql, telefone);
        return results.length > 0;
    },

    async createUsuario(userData, connection) {
        const colunasUsuario = ['nome', 'email', 'senha'];
        if (userData.telefone) {
            colunasUsuario.push('telefone');
        }

        const valoresUsuario = [userData.nome, userData.email, userData.senha];

        if (userData.telefone) {
            valoresUsuario.push(userData.telefone);
        }

        const sqlUsuario = insertInto("Usuario", colunasUsuario);
        const resultsUsuario = await connection.query(sqlUsuario, valoresUsuario);
        connection.release();

        return resultsUsuario[0].insertId;
    },

    async createCliente(userData) {
        return withTransaction(async (connection) => {

            const usuarioId = await this.createUsuario(userData, connection);

            const sqlCliente = insertInto("Cliente", ['id_cliente']);
            await connection.query(sqlCliente, usuarioId);
            connection.release();

            return usuarioId;
        });
    },

    async createBarbeiro(userData) {
        return withTransaction(async (connection) => {

            const usuarioId = await this.createUsuario(userData, connection);

            const colunasBarbeiro = ['id_barbeiro', 'data_contratacao', 'cpf', 'percentual_comissao'];

            const valoresBarbeiro = [usuarioId, userData.data_contratacao, userData.cpf, userData.percentual_comissao];

            const sqlBarbeiro = insertInto("Barbeiro", colunasBarbeiro);
            await connection.query(sqlBarbeiro, valoresBarbeiro);
            connection.release();

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
            connection.release();

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
            connection.release();

            return usuarioId;
        });
    },

    async deleteById(id) {
        const sql = `${deleteFrom(tableName)} ${where({id_usuario: null}).sql}`;
        await query(sql, id);
        return true;
    },

    async findByEmail(email) {
        const sql = `select *
                     from Usuario
                     where email = ?`;
        const results = await query(sql, email);
        return results[0];
    },

    async getWorkScheduleByBarberID(barberId) {
        const sql = `SELECT *
                     FROM Barbeiro_Horarios
                     WHERE id_barbeiro = ?`;
        const results = await query(sql, barberId);
        return results;
    },

    async removeWorkSchedule(barberId, workScheduleId) {
        const sql = `DELETE FROM Barbeiro_Horarios
                     WHERE id_barbeiro = ? AND id_horario = ?`;
        const result = await query(sql, [barberId, workScheduleId]);
        return result.affectedRows > 0;
    },
};

module.exports = userRepository;
