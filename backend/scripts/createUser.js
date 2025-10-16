const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const db = require('../models');

// --- DATOS DEL USUARIO QUE QUIERES CREAR ---
// Puedes cambiar estos valores a los que prefieras
const userData = {
  name: 'Usuario de Prueba',
  email: 'test@example.com',
  password: 'password123', // Elige una contraseña segura
  role: 'usuario', // Puede ser 'usuario', 'organizador' o 'admin'
};
// -----------------------------------------

const createUser = async () => {
  try {
    // 1. Conectar a la base de datos
    await db.sequelize.sync();
    console.log('Conexión a la base de datos establecida.');

    // 2. Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { email: userData.email } });
    if (existingUser) {
      console.log(`El usuario con el correo ${userData.email} ya existe.`);
      return;
    }

    // 3. Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);
    console.log('Contraseña encriptada.');

    // 4. Crear el nuevo usuario en la base de datos
    const newUser = await Usuario.create({
      name: userData.name,
      email: userData.email,
      password_hash: password_hash,
      role: userData.role,
    });

    console.log('¡Usuario creado con éxito!');
    console.log({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

  } catch (error) {
    console.error('Error al crear el usuario:', error);
  } finally {
    // 5. Cerrar la conexión
    await db.sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
  }
};

createUser();