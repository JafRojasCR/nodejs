const bcrypt = require("bcryptjs"); // Importa bcrypt para el hash de contraseñas
const Camisa = require("../models/camisetaEsquema"); // Importa el modelo de Usuario
const Usuario = require("../models/usuarioEsquema"); // Importa el modelo de Usuario, usado para el Get
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken para manejar autenticación

// Obtener todos los usuarios
exports.obtenerCamisas = async (req, res) => {
  try {
    const camisetas = await Camisa.find(); // Lista de camisetas desde la coleccion (ejemplo)
    
    // Enriquecer cada camiseta con datos del usuario creador:
    const camisetasConUsuario = await Promise.all(
      // El promise lo que hace es recorrer cada camiseta "c" y buscar al usuario creador
      camisetas.map(async (c) => {
        try {
          // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
          const usuario = await Usuario.findById(c.creador).select(
            "nombre correo"
          );
          // Busca el usuario para esa camisa, tomando su nombre y correo
          // Si se encuentra el usuario, lo agregamos a la camiseta
          return {
            ...c.toObject(), // Convertir el documento de Mongoose a objeto plano JS
            creador: usuario || null, // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
          };
        } catch (error) {
          // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
          return {
            ...c.toObject(),
            creador: null,
          };
        }
      })
    );

    res.json(camisetasConUsuario); // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" }); // Error genérico en caso de fallo
  }
};

// Obtener una camiseta por ID
exports.obtenerCamisaPorId = async (req, res) => {
  try {
    const camisa = await Camisa.findById(req.params.id); // Busca camiseta por el ID proporcionado
    if (!camisa) {
      return res.status(404).json({ error: "Camiseta no encontrada" }); // Si no existe, 404
    }
    res.json(camisa); // Si existe, lo devolvemos en JSON
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Crear un nuevo usuario
exports.crearCamisa = async (req, res) => {
  try {
    const nuevaCamisa = new Camisa(req.body);
    nuevaCamisa.creador = req.usuarioId; // Asigna el ID del creador desde el token JWT

    await nuevaCamisa.save();
    res
      .status(201)
      .json({ mensaje: "Camiseta creada con éxito", id: nuevaCamisa._id });
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la camiseta" });
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
      return res.status(404).json({ error: "Camiseta no encontrada" });
    }
    res.json(camisaActualizada);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la camiseta" });
  }
};

// Eliminar una camiseta
exports.eliminarCamisa = async (req, res) => {
  try {
    const camisaEliminada = await Camisa.findByIdAndDelete(req.params.id);
    if (!camisaEliminada) {
      return res.status(404).json({ error: "Camiseta no encontrada" });
    }
    res.json({ message: "Camiseta eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
