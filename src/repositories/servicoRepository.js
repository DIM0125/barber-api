const { query, withTransaction } = require('../utils/database');
const { select, insertInto, update, where, deleteFrom } = require('../utils/sqlTemplates');

const tableName = 'Servico';

const servicoRepository = {
  async findById(id) {
    const sql = `SELECT s.*, p.valor, p.id_preco FROM Servico s NATURAL JOIN Preco p WHERE atual = 1 AND id_servico = ?`;
    const results = await query(sql, [id]);
    return results[0];
  },

  async findAll() {
    const sql = `SELECT s.*, p.valor, p.id_preco FROM Servico s NATURAL JOIN Preco p WHERE atual = 1`;
    const results = await query(sql);
    return results;
  },

  async create(servicoData) {
    const columns = ['nome', 'descricao', 'duracao_estimada'];
    const values = [servicoData.nome, servicoData.descricao, servicoData.duracao_estimada];

    return withTransaction(async (connection) => {

      console.log(servicoData);

      const sql = insertInto(tableName, columns);
      const result = await connection.query(sql, values);
      
      const sqlPreco = insertInto('Preco', ['id_servico', 'valor', 'atual', 'data']);
      const hoje = new Date().toISOString().slice(0, 10);
      const resultPreco = await connection.query(sqlPreco, [result[0].insertId, servicoData.preco, 1, hoje]);

      return [result[0].insertId, resultPreco[0].insertId];
    });
  },

  async update(id, servicoData) {
    return withTransaction(async (connection) => {

      const { id_preco, valor, ...onlyServicoData } = servicoData;

      if (valor) {
        const sqlPreco = `UPDATE PRECO SET atual = 0 WHERE id_preco = ?`;
        await connection.query(sqlPreco, id_preco);

        const sqlPreco2 = `INSERT INTO PRECO (id_servico, atual, valor, data) VALUES (?, ?, ?, ?)`;
        const hoje = new Date().toISOString().slice(0, 10);
        await connection.query(sqlPreco2, [id, 1, valor, hoje]);
      }

      if (Object.keys(onlyServicoData).length) {
        const { sql, values } = update(tableName, onlyServicoData, { id_servico: id });
        values.push(id);
        const sqlWithWhere = `${sql} WHERE id_servico = ?`;
        const result = await connection.query(sqlWithWhere, values);
        return result.affectedRows;
      }

      return ""
    })
  },

  async delete(id) {
    const sql = `${deleteFrom(tableName)} ${where({ id_servico: id }).sql}`;
    const result = await query(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = servicoRepository;
