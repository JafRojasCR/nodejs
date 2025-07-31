const routes = require('./routes/usuarioRutas');    // Importa las rutas de usuario
const express = require('express');
const mongoose = require('mongoose'); // importamos la librería Mongoose 
const path = require('path'); // Módulo para rutas absolutas
const PORT = process.env.PORT || 3000;
const { verificarToken } = require('./seguridad/auth'); // Importa el middleware de autenticación


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
// app.use(express.static(path.join(__dirname, 'public')));
// Esta que está comentada es para servir archivos estáticos desde la carpeta public, entonces se
// puede acceder desde el navegador, como: localhost:3000/registro.html


// Endpoints para que al ingresar algo como "localhost:3000/registro.html" no sirva, pero que al
// poner cosas como "localhost:3000/registro" sirva el archivo registro.html

app.get('/camiseta', verificarToken, (req,res) => {
res.sendFile(path.join(__dirname, 'public', 'camiseta.html')); // Envía el archivo camiseta.html
});


app.get('/registro', (req,res) => {
res.sendFile(path.join(__dirname, 'public', 'registro.html')); // Envía el archivo registro.html
});

app.get('/login', (req,res) => {
res.sendFile(path.join(__dirname, 'public', 'login.html')); // Envía el archivo login.html
});

app.get('/css/loginreg', (req,res) => {
res.sendFile(path.join(__dirname, 'public', 'css', 'loginreg.css')); // Envía el archivo loginreg.css
});


  // Todo lo de la carpeta public se sirve de forma estática y accesible desde fuera (navegador)
app.use('/api/usuarios', routes); // Usa las rutas de usuario definidas en usuarioRutas.js
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/registro.html