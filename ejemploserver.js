const http = require("http");
//Se importa el módulo http de Node.js para crear un servidor web

// Creamos un servidor que maneja las solicitudes entrantes
// req es la solicitud, res es la respuesta que se le da a esta solicitud
const server = http.createServer((req, res) => {
  //FUNCION ANONIMA
  // Establecemos el código de respuesta HTTP 200 (OK) y el tipo de contenido

  res.writeHead(200, { "Content-Type": "text/html" });
  //Codigo de respuesta: 200, contenido de tipo HTML

  // Enviamos el cuerpo de la respuesta
  res.end("¡Hola Mundo desde Node.js!");
});


// Ponemos a escuchar el servidor en el puerto 8080 y mostramos un mensaje en la consola
// Cuando llegue algo del puerto 8080, se ejecutará la función que regresa el mensaje
server.listen(8080, () => {
  console.log("Servidor en http://localhost:8080");
});
