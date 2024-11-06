const express = require("express");
const conectarDB = require('./config/db');  // Corregido el nombre de la función
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la base de datos
conectarDB().catch(err => {
    console.error('Error al conectar a la base de datos', err);
    process.exit(1);  // Detiene el proceso si hay error en la conexión
});

// Configuración de middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ruta', require('./routes/ruta'));
app.use('/api/rutaMapa', require('./routes/rutaMapa'));

// Definimos el puerto (se usa 4000 por defecto, pero se puede cambiar desde el entorno)
const PORT = process.env.PORT || 4000;

// Arrancamos el servidor
app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
