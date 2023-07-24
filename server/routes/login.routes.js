// Rutas para usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User');

// Ruta para el inicio de sesión
// router.post('/login', userController.loginUser);

//api/login
router.post('/iniciar-sesion', userController.signInUser);

module.exports = router;

//CRUD es el acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar).
