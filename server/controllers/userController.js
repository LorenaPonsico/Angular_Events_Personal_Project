const User = require("../models/User");

exports.createUser = async (req, res) => {

    try {
        //crear usuario
        let user;
        user = new User(req.body);

        await user.save()
        res.send(user)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.getUsers = async (req, res) => {

    try {
        //mostrar usuarios
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.updateUser = async (req, res) => {

    try {
        //actualizar usuario por id
        const { name, surname, email, password, phone, birthDate, img} = req.body;
 
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = password;
        user.phone = phone;
        user.birthDate = birthDate;
        user.img = img;


        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })
        res.json(user)


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.getUser = async (req, res) => {

    try {
        //mostrar usuario por id
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.deleteUser = async (req, res) => {

    try {
        //borrar evento por id
        let User = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

      await User.findOneAndRemove({ _id: req.params.id})
      res.json({ msg: 'Evento eliminado con exito'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

