const express = require('express');
const router = express.Router();

// Importa las funciones del controlador usando los nombres correctos
// (registerUser y loginUser, que son los que definiste en authController.js)
const { 
  registerUser, 
  loginUser, 
  getMe // Asumiendo que también quieres la ruta /me
} = require('../controllers/authController');

// Opcional: Si tienes el middleware 'protect', debes importarlo
const { protect } = require('../middleware/authMiddleware');

// Usa los nombres de función correctos para definir las rutas
router.post('/register', registerUser); // Antes era authController.register (undefined)
router.post('/login', loginUser);       // Antes era authController.login (undefined)
router.get('/me', protect, getMe);      // Ruta protegida

module.exports = router;