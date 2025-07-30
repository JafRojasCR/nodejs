const routes = require('./routes/usuarioRutas');    // Importa las rutas de usuario
const express = require('express');
const mongoose = require('mongoose'); // importamos la librería Mongoose 
const path = require('path'); // Módulo para rutas absolutas
const PORT = process.env.PORT || 3000;


// URI de conexión a MongoDB (MongoDB Atlas en este caso).  
// Reemplaza <usuario>, <password> y <tuBase> por tus datos reales. 
const mongoURI = 'mongodb+srv://2018473:jafet123@cluster0.3ksikky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
// Opciones recomendadas para evitar advertencias (según la versión de Mongoose) 
const options = { 
useNewUrlParser: true,    // Usa el nuevo parser de URL Mongo 
useUnifiedTopology: true  // Usa el nuevo motor de manejo de topologías 
}; 
// Conectarse a la base de datos: 
mongoose.connect(mongoURI, options) 
.then(() => console.log('Conectado a MongoDB Atlas'))   // Éxito en la conexión 
.catch(err => console.error('Error de conexión:', err)); // Manejo de error 


const app = express();

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json());   // Permite recibir datos en formato JSON
app.use(express.static(path.join(__dirname, 'public')));
  // Todo lo de la carpeta public se sirve de forma estática y accesible desde fuera (navegador)
app.use('/api/usuarios', routes); // Usa las rutas de usuario definidas en usuarioRutas.js
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/api/usuarios