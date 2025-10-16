const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pago = sequelize.define('Pago', {
  pago_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  fecha_pago: {
    type: DataTypes.DATEONLY,
  },
  numero_referencia: {
    type: DataTypes.STRING(100),
  },
  url_comprobante: {
    type: DataTypes.TEXT,
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  tableName: 'pagos',
  timestamps: false,
});

module.exports = Pago;