// backend/middleware/authMiddleware.js (CORREGIDO)

const jwt = require('jsonwebtoken');
// Importa tus modelos para acceder a la base de datos
const { Usuario } = require('../models'); 

// 1. La función debe ser asíncrona para usar await
exports.protect = async (req, res, next) => {
  let token;

  // 1.1 Verificar el formato del token en el header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar el token y obtener el ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id; // Asumiendo que firmaste el ID

      // 3. CONSULTAR LA BASE DE DATOS con el ID (Corazón de la Corrección)
      // Buscamos el usuario y excluimos el hash de la contraseña por seguridad
      const user = await Usuario.findByPk(userId, { 
        attributes: { exclude: ['password_hash'] } 
      });

      if (!user) {
        // Si el token es válido pero el usuario fue borrado (raro, pero posible)
        res.status(401);
        throw new Error('Usuario asociado al token no encontrado.');
      }

      // 4. Adjuntar el OBJETO COMPLETO DE SEQUELIZE a la solicitud
      req.user = user; 
      
      next();
    } catch (error) {
      // 5. Manejo de errores de JWT/Base de Datos
      console.error('Error de autenticación:', error.message);
      // Evita que la aplicación se caiga y devuelve 401 si hay problemas con el token
      return res.status(401).json({ error: 'No autorizado, el token no es válido o ha expirado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, no se proporcionó token.' });
  }
};

// La función authorize no requiere cambios, ya que ahora req.user es el objeto de usuario completo.
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // req.user.role viene del objeto de Sequelize que se adjuntó arriba.
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Rol de usuario no autorizado.' });
    }
    next();
  };
};

// Nota importante: Asegúrate de que tu JWT_SECRET esté definido en tu archivo .env