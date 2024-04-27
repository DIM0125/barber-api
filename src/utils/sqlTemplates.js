/**
 * Cria uma cláusula SELECT SQL com base nos parâmetros fornecidos.
 * @param {Array} columns - Colunas a serem selecionadas.
 * @param {string} tableName - O nome da tabela de onde selecionar.
 * @returns {string} - Consulta SQL SELECT.
 */
function select(columns, tableName) {
    const columnsSql = columns.length ? columns.join(', ') : '*';
    return `SELECT ${columnsSql}
            FROM ${tableName}`;
}

/**
 * Cria uma cláusula WHERE SQL com base nos parâmetros fornecidos.
 * @param {Object} conditions - Condições a serem incluídas na cláusula WHERE.
 * @returns {Object} - Objeto com a cláusula SQL e os valores correspondentes.
 */
function where(conditions) {
    const keys = Object.keys(conditions);
    const sqlParts = keys.map(key => `${key} = ?`);
    return {
        sql: keys.length ? ` WHERE ${sqlParts.join(' AND ')}` : '',
        values: keys.map(key => conditions[key])
    };
}

/**
 * Cria uma cláusula INSERT INTO SQL para múltiplas linhas.
 * @param {string} tableName - O nome da tabela onde inserir.
 * @param {Array} columns - Colunas para as quais os valores serão inseridos.
 * @returns {string} - Consulta SQL INSERT INTO.
 */
function insertInto(tableName, columns) {
    const placeholders = columns.map(() => '?').join(', ');
    return `INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${placeholders})`;
}

/**
 * Cria uma cláusula UPDATE SQL.
 * @param {string} tableName - O nome da tabela para atualizar.
 * @param {Object} updates - Um objeto com chaves como colunas e valores como novos valores.
 * @returns {Object} - Objeto com a cláusula SQL e os valores correspondentes.
 */
function update(tableName, updates) {
    const keys = Object.keys(updates);
    const sqlParts = keys.map(key => `${key} = ?`);
    return {
        sql: `UPDATE ${tableName}
              SET ${sqlParts.join(', ')}`,
        values: keys.map(key => updates[key])
    };
}

/**
 * Cria uma cláusula DELETE FROM SQL.
 * @param {string} tableName - O nome da tabela de onde deletar.
 * @returns {string} - Consulta SQL DELETE FROM.
 */
function deleteFrom(tableName) {
    return `DELETE
            FROM ${tableName}`;
}

/**
 * Cria uma cláusula JOIN SQL.
 * @param {Array} joins - Um array de objetos com as propriedades 'type', 'tableName', 'alias' e 'on'.
 * @returns {string} - A cláusula JOIN SQL.
 */
function join(joins) {
    return joins.map(j => {
        const joinType = j.type.toUpperCase(); // INNER, LEFT, RIGHT, etc.
        const table = j.tableName;
        const alias = j.alias ? ` AS ${j.alias}` : '';
        const on = j.on;
        return `${joinType} JOIN ${table}${alias} ON ${on}`;
    }).join(' ');
}

module.exports = {
    select,
    where,
    insertInto,
    update,
    deleteFrom,
    join
};
