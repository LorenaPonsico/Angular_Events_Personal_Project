const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    try {
        //crear usuario
        let user;
        user = new User(req.body);
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
        //actualizar usuario por id
        const { name, surname, email, password, phone, birthDate, img } = req.body;

        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ msg: 'no existe el producto' })
        }

        user.name = name;
        user.surname = surname;
        user.email = email;

        user.phone = phone;
        user.birthDate = birthDate;
        user.img = img;

        const saltRounds = 10; // Número de rondas para el proceso de hasheo

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;

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

        await User.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Evento eliminado con exito' })

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
        //   const isPasswordValid = password === user.password ? true : false;

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




