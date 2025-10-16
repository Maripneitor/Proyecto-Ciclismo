const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); // Importamos desde el index de modelos

// Registro de un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { nombre_completo, email, contrasena, rol } = req.body;

    // Validaciones básicas
    if (!nombre_completo || !email || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 12); // Aumentamos el salt a 12 para mayor seguridad

    const nuevoUsuario = await Usuario.create({
      nombre_completo,
      email,
      contrasena: hashedPassword,
      rol: rol || 'usuario', // Rol por defecto es 'usuario'
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      usuario: {
        usuario_id: nuevoUsuario.usuario_id,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    });
  } catch (error) {
    // Manejo de errores específicos (ej. email duplicado)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: 'El email y la contraseña son obligatorios.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        userId: usuario.usuario_id,
        rol: usuario.rol,
        nombre: usuario.nombre_completo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Token válido por 8 horas
    );

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        usuario_id: usuario.usuario_id,
        nombre: usuario.nombre_completo,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
  }
};