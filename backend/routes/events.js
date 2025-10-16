const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Ruta pública para ver todos los eventos
router.get('/', eventoController.getAllEvents);

// Ruta protegida para crear un evento (solo organizadores y administradores)
router.post('/', protect, authorize('organizador', 'admin'), eventoController.createEvent);

module.exports = router;