const jwt = require("jsonwebtoken");
require('dotenv').config();
const secreto = process.env.JWT_SECRET;

// Requiere que dotenv y la línea require estén instalados y haya un archivo ignorado .env con la variable JWT_SECRET

// Middleware para verificar JWT
function verificarToken(req, res, next) {
  const token = req.query.token || req.headers["authorization"].split(" ")[1];
  // Busca el token en query params o en headers

  try {
    const decoded = jwt.verify(token, secreto); // Si no tiene el mismo secreto, falla
    req.usuarioId = decoded.id; // Guardamos el id del token en la request para usarlo después
    next(); // Token válido, continuar a la siguiente función
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

module.exports = { verificarToken }; // Exportamos el middleware para usarlo en las rutas
//Devuelve un objeto, que es la función verificarToken
