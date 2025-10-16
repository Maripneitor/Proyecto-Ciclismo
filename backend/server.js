const express = require('express');
const cors = require('cors');
const db = require('./models'); // Cambiado para importar desde el index.js de modelos
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas (se mantendrán por ahora, pero las actualizaremos después)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;

// Usamos db.sequelize para sincronizar
db.sequelize.sync({ alter: true }).then(() => { // 'alter: true' es útil en desarrollo
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});