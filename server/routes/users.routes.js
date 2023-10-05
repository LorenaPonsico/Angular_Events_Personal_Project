// Rutas para usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//api/users
router.post('/registro', userController.createUser); //Crear
router.get('/', userController.getUsers); //Leer todos
router.put('/:id', userController.updateUser); //Actualizar por id
router.get('/:id', userController.getUser); //Leer por id
router.delete('/:id', userController.deleteUser); //Borrar por id

router.post('/iniciar-sesion', userController.signInUser);

module.exports = router;

//CRUD es el acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar).
