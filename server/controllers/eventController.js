const Event = require("../models/Event");

exports.createEvent = async (req, res) => {

    try {
        //crear evento
        let event;
        event = new Event(req.body);

        await event.save()
        res.send(event)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.getEvents = async (req, res) => {

    try {
        //mostrar eventos
        const events = await Event.find();
        res.json(events);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.updateEvent = async (req, res) => {

    try {
        //actualizar evento por id
        const { title, date, startTime, endTime, capacity, location, description, type, img, registeredParticipants } = req.body;
        let event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        event.title = title;
        event.date = date;
        event.startTime = startTime;
        event.endTime = endTime;
        event.capacity = capacity;
        event.location = location;
        event.description = description;
        event.type = type;
        event.img = img;
        event.registeredParticipants = registeredParticipants;

        event = await Event.findOneAndUpdate({ _id: req.params.id }, event, { new: true })
        res.json(event)


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.getEvent = async (req, res) => {

    try {
        //mostrar evento por id
        let event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        res.json(event);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.deleteEvent = async (req, res) => {

    try {
        //borrar evento por id
        let event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        await Event.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Evento eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

