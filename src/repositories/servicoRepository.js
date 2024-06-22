const { query } = require('../utils/database');
const { select, insertInto, update, where, deleteFrom } = require('../utils/sqlTemplates');

const tableName = 'Servico';

const servicoRepository = {
  async findById(id) {
    const sql = `${select(['*'], tableName)} ${where({ id_servico: id }).sql}`;
    const results = await query(sql, [id]);
    return results[0];
  },

  async findAll() {
    const sql = `${select(['*'], tableName)};`;
    const results = await query(sql);
    return results;
  },

  async create(servicoData) {
    const columns = Object.keys(servicoData);
    const values = Object.values(servicoData);
    const sql = insertInto(tableName, columns);
    const result = await query(sql, values);
    return result.insertId;
  },

  async update(id, servicoData) {
    const { sql, values } = update(tableName, servicoData, { id_servico: id });
    const result = await query(sql, values);
    return result.affectedRows;
  },

  async delete(id) {
    const sql = `${deleteFrom(tableName)} ${where({ id_servico: id }).sql}`;
    const result = await query(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = servicoRepository;
