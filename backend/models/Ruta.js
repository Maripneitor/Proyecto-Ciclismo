const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ruta = sequelize.define('Ruta', {
  ruta_id: {
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
  distancia_km: {
    type: DataTypes.DECIMAL(6, 2),
  },
}, {
  tableName: 'rutas',
  timestamps: false,
});

module.exports = Ruta;