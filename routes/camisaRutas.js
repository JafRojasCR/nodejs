const express = require('express');
const router = express.Router();
const camisetaControlador = require('../controllers/camisetaControlador');

router.get('/', camisetaControlador.obtenerCamisas); // Ruta para obtener todas las camisas
router.get('/:id', camisetaControlador.obtenerCamisaPorId); // Ruta para obtener una camisa
router.post('/', camisetaControlador.crearCamisa); // Ruta para crear una nueva camisa
router.put('/:id', camisetaControlador.modificarCamisa); // Ruta para actualizar una camisa
router.delete('/:id', camisetaControlador.eliminarCamisa); // Ruta para eliminar una camisa

module.exports = router;
