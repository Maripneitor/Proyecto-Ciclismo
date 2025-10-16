const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoriaEvento = sequelize.define('CategoriaEvento', {
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  cuota_categoria: {
    type: DataTypes.DECIMAL(10, 2),
  },
  maximo_participantes_categoria: {
    type: DataTypes.INTEGER,
  },
  punto_control_final_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'categorias_evento',
  timestamps: false,
});

module.exports = CategoriaEvento;