const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResultadoCarrera = sequelize.define('ResultadoCarrera', {
  resultado_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  posicion_general: {
    type: DataTypes.INTEGER,
  },
  posicion_categoria: {
    type: DataTypes.INTEGER,
  },
  tiempo_total: {
    type: DataTypes.STRING, // <<<--- ¡ESTE ES EL CAMBIO!
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'resultados_carrera',
  timestamps: false,
});

module.exports = ResultadoCarrera;