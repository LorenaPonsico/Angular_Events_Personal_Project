// Rutas para eventos
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

//api/events
router.post('/', eventController.createEvent); //Crear
router.get('/', eventController.getEvents); //Leer todos
router.put('/:id', eventController.updateEvent); //Actualizar por id
router.get('/:id', eventController.getEvent); //Leer por id
router.delete('/:id', eventController.deleteEvent); //Borrar por id

module.exports = router;

//CRUD es el acrónimo de Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar).