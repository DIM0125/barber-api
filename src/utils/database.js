const pool = require('../config/dbConfig');

/**
 * Execute a SQL query on the database.
 *
 * @param {string} sql - The SQL query string
 * @param {Array} [params] - The parameters for the query
 * @returns {Promise} - A promise that resolves with the query results
 */
async function query(sql, params) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, params);
        return results;
    } finally {
        connection.release();
    }
}

async function withTransaction(operation) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await operation(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {query, withTransaction};
