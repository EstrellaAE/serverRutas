// Rutas para Mapa
const express = require('express');
const router = express.Router();
const rutaMapaController = require('../controllers/rutaMapaController');

// api/rutas

router.get('/', rutaMapaController.obtenerRutaMapa);
router.post('/', rutaMapaController.crearRutaMapa);



module.exports = router;