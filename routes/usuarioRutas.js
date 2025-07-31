const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controllers/usuarioControlador');

router.get('/', usuarioControlador.obtenerUsuarios); // Ruta para obtener todos los usuarios
router.get('/:id', usuarioControlador.obtenerUsuarioPorId); // Ruta para obtener un usuario
router.post('/', usuarioControlador.crearUsuario); // Ruta para crear un nuevo usuario
router.put('/:id', usuarioControlador.modificarUsuario); // Ruta para actualizar un usuario
router.delete('/:id', usuarioControlador.eliminarUsuario); // Ruta para eliminar un usuario
router.post('/login', usuarioControlador.login); // Ruta para iniciar sesión

module.exports = router;
