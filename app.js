require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env
const userRoutes = require("./routes/usuarioRutas"); // Importa las rutas de usuario
const camisaRoutes = require("./routes/camisaRutas"); // Importa las rutas de camiseta
const viewRoutes = require("./routes/viewRoutes"); // Importa las rutas de vistas
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Módulo para rutas absolutas
const PORT = process.env.PORT;
const { verificarToken } = require("./middleware/auth"); // Importa el middleware de autenticación
const connectDB = require("./config/db"); // Importa la función de conexión a la base de datos

connectDB(); // Llama a la función para conectar a la base de datos

// Inicializa la aplicación Express
const app = express();

// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json()); // Permite recibir datos en formato JSON

app.use("/api/usuarios", userRoutes); // Usa las rutas de usuario definidas en usuarioRutas.js
app.use("/api/camisetas", camisaRoutes); // Usa las rutas de camiseta definidas en camisetaRutas.js
app.use("/", viewRoutes); // Usa las rutas de vistas definidas en viewRoutes.js
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
// Probar en http://localhost:3000/registro.html
