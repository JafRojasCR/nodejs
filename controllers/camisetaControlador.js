const bcrypt = require('bcryptjs'); // Importa bcrypt para el hash de contraseñas
const Camisa = require('../models/camisetaEsquema'); // Importa el modelo de Usuario
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para manejar autenticación

// Obtener todos los usuarios
exports.obtenerCamisas = async (req, res) => {
  try {
    const camisas = await Camisa.find();    // Busca todos los documentos de camisas en la BD
    res.json(camisas);                       // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
  }
};

// Obtener una camiseta por ID
exports.obtenerCamisaPorId = async (req, res) => {
  try {
    const camisa = await Camisa.findById(req.params.id); // Busca camiseta por el ID proporcionado
    if (!camisa) {
      return res.status(404).json({ error: 'Camiseta no encontrada' }); // Si no existe, 404
    }
    res.json(camisa); // Si existe, lo devolvemos en JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo usuario
exports.crearCamisa = async (req, res) => {
  try {
    const datos = req.body;

    const nuevaCamisa = new Camisa(datos);

    await nuevaCamisa.save();
    res.status(201).json({ mensaje: 'Camiseta creada con éxito', id: nuevaCamisa._id });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la camiseta' });
  }
};

// Actualizar una camiseta existente
exports.modificarCamisa = async (req, res) => {
  try {
    const datosActualizados = req.body;
    const camisaActualizada = await Camisa.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true }
    );
    if (!camisaActualizada) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    res.json(camisaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la camiseta' });
  }
};

// Eliminar una camiseta
exports.eliminarCamisa = async (req, res) => {
  try {
    const camisaEliminada = await Camisa.findByIdAndDelete(req.params.id);
    if (!camisaEliminada) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    res.json({ message: 'Camiseta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};
