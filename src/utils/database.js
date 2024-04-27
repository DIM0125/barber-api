const pool = require('../config/dbConfig');

/**
 * Execute a SQL query on the database.
 *
 * @param {string} sql - The SQL query string
 * @param {Array} [params] - The parameters for the query
 * @returns {Promise} - A promise that resolves with the query results
 */
function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(sql, params, (error, results) => {
                connection.release();
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    });
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

module.exports = {query};
