const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Product = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_ultima_modificacao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  modificado_por: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nome: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  quantidade_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade_minima: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Produto',
  timestamps: false
});

module.exports = Product;