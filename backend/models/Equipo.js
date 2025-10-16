const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Equipo = sequelize.define('Equipo', {
  equipo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  capitan_usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enlace_invitacion: {
    type: DataTypes.STRING(255),
    unique: true,
  },
}, {
  tableName: 'equipos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: false,
});

module.exports = Equipo;