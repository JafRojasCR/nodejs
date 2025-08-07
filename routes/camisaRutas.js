const express = require('express');
const router = express.Router();
const camisetaControlador = require('../controllers/camisetaControlador');
const { verificarToken } = require('../middleware/auth');

router.get('/', verificarToken, camisetaControlador.obtenerCamisas); // Ruta para obtener todas las camisas
router.get('/:id', verificarToken, camisetaControlador.obtenerCamisaPorId); // Ruta para obtener una camisa
router.post('/', verificarToken, camisetaControlador.crearCamisa); // Ruta para crear una nueva camisa
router.put('/:id', verificarToken, camisetaControlador.modificarCamisa); // Ruta para actualizar una camisa
router.delete('/:id', verificarToken, camisetaControlador.eliminarCamisa); // Ruta para eliminar una camisa

module.exports = router;
