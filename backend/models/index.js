const sequelize = require('../config/database');

// Importar todos los modelos
const Usuario = require('./Usuario');
const Equipo = require('./Equipo');
const Evento = require('./Evento');
const Ruta = require('./Ruta');
const PuntoDeControl = require('./PuntoDeControl');
const CategoriaEvento = require('./CategoriaEvento');
const TallaPlayeraEvento = require('./TallaPlayeraEvento');
const Inscripcion = require('./Inscripcion');
const Pago = require('./Pago');
const TiempoCarrera = require('./TiempoCarrera');
const ResultadoCarrera = require('./ResultadoCarrera');

// --- Definir todas las asociaciones ---

// Usuario -> Equipo (como capitán)
Usuario.hasMany(Equipo, { foreignKey: 'capitan_usuario_id', as: 'equiposLiderados' });
Equipo.belongsTo(Usuario, { foreignKey: 'capitan_usuario_id', as: 'capitan' });

// Usuario <-> Equipo (miembros, muchos a muchos)
Usuario.belongsToMany(Equipo, { through: 'miembros_equipos', foreignKey: 'usuario_id', otherKey: 'equipo_id', timestamps: false });
Equipo.belongsToMany(Usuario, { through: 'miembros_equipos', foreignKey: 'equipo_id', otherKey: 'usuario_id', as: 'miembros', timestamps: false });

// Usuario -> Evento (como organizador)
Usuario.hasMany(Evento, { foreignKey: 'organizador_id', as: 'eventosOrganizados' });
Evento.belongsTo(Usuario, { foreignKey: 'organizador_id', as: 'organizador' });

// Evento -> Ruta
Evento.hasMany(Ruta, { foreignKey: 'evento_id', as: 'rutas' });
Ruta.belongsTo(Evento, { foreignKey: 'evento_id' });

// Ruta -> PuntoDeControl
Ruta.hasMany(PuntoDeControl, { foreignKey: 'ruta_id', as: 'puntosDeControl' });
PuntoDeControl.belongsTo(Ruta, { foreignKey: 'ruta_id' });

// Evento -> CategoriaEvento
Evento.hasMany(CategoriaEvento, { foreignKey: 'evento_id', as: 'categorias' });
CategoriaEvento.belongsTo(Evento, { foreignKey: 'evento_id' });

// PuntoDeControl -> CategoriaEvento (punto final)
PuntoDeControl.hasMany(CategoriaEvento, { foreignKey: 'punto_control_final_id', as: 'categoriaConMeta' });
CategoriaEvento.belongsTo(PuntoDeControl, { foreignKey: 'punto_control_final_id', as: 'meta' });

// Evento -> TallaPlayeraEvento
Evento.hasMany(TallaPlayeraEvento, { foreignKey: 'evento_id', as: 'tallasDisponibles' });
TallaPlayeraEvento.belongsTo(Evento, { foreignKey: 'evento_id' });

// --- Asociaciones de Inscripcion ---
Usuario.hasMany(Inscripcion, { foreignKey: 'usuario_id' });
Inscripcion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Evento.hasMany(Inscripcion, { foreignKey: 'evento_id' });
Inscripcion.belongsTo(Evento, { foreignKey: 'evento_id' });

CategoriaEvento.hasMany(Inscripcion, { foreignKey: 'categoria_id' });
Inscripcion.belongsTo(CategoriaEvento, { foreignKey: 'categoria_id' });

TallaPlayeraEvento.hasMany(Inscripcion, { foreignKey: 'talla_playera_id' });
Inscripcion.belongsTo(TallaPlayeraEvento, { foreignKey: 'talla_playera_id' });

Equipo.hasMany(Inscripcion, { foreignKey: 'equipo_id' });
Inscripcion.belongsTo(Equipo, { foreignKey: 'equipo_id' });

// --- Asociaciones de final de carrera ---
Inscripcion.hasOne(Pago, { foreignKey: 'inscripcion_id' });
Pago.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });

Inscripcion.hasMany(TiempoCarrera, { foreignKey: 'inscripcion_id', as: 'tiempos' });
TiempoCarrera.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });

PuntoDeControl.hasMany(TiempoCarrera, { foreignKey: 'punto_control_id' });
TiempoCarrera.belongsTo(PuntoDeControl, { foreignKey: 'punto_control_id' });

Inscripcion.hasOne(ResultadoCarrera, { foreignKey: 'inscripcion_id' });
ResultadoCarrera.belongsTo(Inscripcion, { foreignKey: 'inscripcion_id' });

// --- Exportar todo ---
const db = {
  sequelize,
  Usuario,
  Equipo,
  Evento,
  Ruta,
  PuntoDeControl,
  CategoriaEvento,
  TallaPlayeraEvento,
  Inscripcion,
  Pago,
  TiempoCarrera,
  ResultadoCarrera,
};

module.exports = db;