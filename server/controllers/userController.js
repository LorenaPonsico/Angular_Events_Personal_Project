const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    try {
        // Verificar si el email ya existe en la base de datos
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Si el email no existe, crear el usuario
        let user = new User(req.body);
        const saltRounds = 10; // Número de rondas para el proceso de hasheo

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;

        await user.save()

        const token = jwt.sign({ _id: user._id }, 'secretKey')
        res.status(200).json({ token })

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
        console.log(users)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.updateUser = async (req, res) => {

    try {
        // Actualizar usuario por ID
        const { name, surname, email, password, phone, birthDate, img, events } = req.body;

        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        user.name = name;
        user.surname = surname;
        user.email = email;
        user.phone = phone;
        user.birthDate = birthDate;
        user.img = img;
        user.events = events;

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
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
        console.log(req.params.id);
        let user = await User.findById(req.params.id);
        if (!user) {

            res.status(404).json({ msg: 'No existe el/la Usuario/a' })
        }

        await User.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Usuario/a eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.signInUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Buscar el usuario por su email en la base de datos
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Si las credenciales son válidas, puedes enviar los datos del usuario como respuesta
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al iniciar sesión' });
    }
};




