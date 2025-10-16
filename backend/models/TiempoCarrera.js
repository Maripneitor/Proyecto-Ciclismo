const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TiempoCarrera = sequelize.define('TiempoCarrera', {
  tiempo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  punto_control_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marca_de_tiempo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'tiempos_carrera',
  timestamps: false,
});

module.exports = TiempoCarrera;