const express = require("express");
const path = require("path");
const router = express.Router();
const { verificarToken } = require("../middleware/auth"); // O la ubicación de tu middleware

// Servir archivos estáticos del public: (PARA PRUEBAS DE PWA)
router.use(express.static(path.join(__dirname, "../public")));

// Endpoints para que al ingresar algo como "localhost:3000/registro.html" no sirva, pero que al
// poner cosas como "localhost:3000/registro" sirva el archivo registro.html

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html")); // Envía el archivo login.html
});

router.get("/camiseta", verificarToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "camiseta.html")); // Envía el archivo camiseta.html
});

router.get("/registro", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "registro.html")); // Envía el archivo registro.html
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html")); // Envía el archivo login.html
});

router.get("/css/loginreg", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "css", "loginreg.css")); // Envía el archivo loginreg.css
});

router.get("/css/camiseta", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "css", "camiseta.css")); // Envía el archivo camiseta.css
});

router.get("/css/header", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "css", "header.css")); // Envía el archivo header.css
});

router.get("/votaciones", verificarToken, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "votaciones.html")); // Envía el archivo votaciones.html
});

module.exports = router;
