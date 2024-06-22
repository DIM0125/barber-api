const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Servico = sequelize.define('Servico', {
  id_servico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  duracao_estimada: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Servico',
  timestamps: false
});

module.exports = Servico;
