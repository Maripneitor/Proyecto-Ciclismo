const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PuntoDeControl = sequelize.define('PuntoDeControl', {
  punto_control_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ruta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'puntos_de_control',
  timestamps: false,
});

module.exports = PuntoDeControl;