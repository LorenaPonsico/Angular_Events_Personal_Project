// Rutas para usuarios
const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require('../controllers/userController');
const User = require('../models/User');

// Ruta para el inicio de sesión
// router.post('/login', userController.loginUser);

//api/users
router.post('/', userController.createUser); //Crear
router.get('/', userController.getUsers); //Leer todos
router.put('/:id', userController.updateUser); //Actualizar por id
router.get('/:id', userController.getUser); //Leer por id
router.delete('/:id', userController.deleteUser); //Borrar por id

// router.signInUser('/iniciar-sesion', userController.signInUser);
router.post('/iniciar-sesion', userController.signInUser);

module.exports = router;

//CRUD es el acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar).
