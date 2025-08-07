// Ejemplo de esquema Camiseta (simplificado)
const { Schema, model } = require('mongoose');

const camisetaSchema = new Schema({
  creador: { type: Schema.Types.ObjectId, ref: 'Usuario' }, // Referencia al creador de la camiseta
  torso: String,
  mangaizq: String,
  mangader: String,
  cuelloizq: String,
  cuelloder: String,
  fechaCreacion: { type: Date, default: Date.now }          /* ,
  votos: [ votoSchema ],       // (ver siguiente sección)
  calificacion: { type: Number, default: 0 }                */
});

module.exports = model('Camiseta', camisetaSchema); // Exportar el modelo para usarlo en otras partes de la aplicación