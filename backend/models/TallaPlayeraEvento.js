const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TallaPlayeraEvento = sequelize.define('TallaPlayeraEvento', {
  talla_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_talla: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tallas_playera_evento',
  timestamps: false,
});

module.exports = TallaPlayeraEvento;