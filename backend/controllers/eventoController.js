const { Evento, Usuario } = require('../models');

// Crear un nuevo evento
exports.createEvent = async (req, res) => {
  try {
    const { nombre, fecha, descripcion, estado, cuota_inscripcion } = req.body;
    const organizador_id = req.user.userId; // Obtenido del token JWT verificado por el middleware

    const nuevoEvento = await Evento.create({
      nombre,
      fecha,
      descripcion,
      estado,
      cuota_inscripcion,
      organizador_id,
    });

    res.status(201).json({
      message: 'Evento creado exitosamente.',
      evento: nuevoEvento,
    });
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
  }
};

// Obtener todos los eventos públicos
exports.getAllEvents = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      // Incluimos el modelo Usuario para obtener los datos del organizador
      include: {
        model: Usuario,
        as: 'organizador', // Usamos el alias que definimos en la relación
        attributes: ['usuario_id', 'nombre_completo', 'email'], // Solo traemos los campos necesarios
      },
      order: [['fecha', 'DESC']], // Ordenamos los eventos por fecha
    });

    res.json(eventos);
  } catch (error) {
    console.error('Error al obtener los eventos:', error);
    res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
  }
};