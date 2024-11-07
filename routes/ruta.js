// Rutas para Trasporte
const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

// api/rutas

router.get('/', rutaController.obtenerRutas);
router.post('/', rutaController.crearRuta);

// Obtener todas las rutas
router.get('/rutas', rutaController.obtenerRutas);

// Crear una nueva ruta
router.post('/rutas', rutaController.crearRuta);

// Editar una ruta por ID
router.put('/:id', rutaController.editarRuta);

// Eliminar una ruta por ID
router.delete('/:id', rutaController.eliminarRuta);

/*// Activar una ruta por ID
router.put('/:id', rutaController.activarRuta);

// Desactivar una ruta por ID
router.put('/:id', rutaController.desactivarRuta);*/


module.exports = router;