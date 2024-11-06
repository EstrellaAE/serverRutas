const mongoose = require('mongoose');

//Acceder a las variables de entorno
require('dotenv').config({path:'variables.env'});

const canectarDB = async () => {
    try {

        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('BD Conectada');
        
    } catch (error) {
        console.log(error);
        process.exit(1); // Detenemos la app
    }
}

module.exports = canectarDB