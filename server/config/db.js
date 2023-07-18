const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const conectarDB = async () => {
    //metodo asincrono porque puede tardar un poco
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('BD conectada')

    } catch (error) {
        console.log(error);
        process.exit(1); //detenemos la app
    }
}

module.exports = conectarDB
//exportamos al funcion asi es visible desde otros archivos