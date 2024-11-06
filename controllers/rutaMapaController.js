const RutaMapa = require("../models/RutaMapa");





// Trae lista de rutas de la BD
exports.obtenerRutaMapa = async (req, res) => {
    try {
        
        const rutaMapa = await RutaMapa.find();
        res.json(rutaMapa)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Inserta una nueva rutaMapa
exports.crearRutaMapa = async (req, res) => {
    try {
        let rutaMapa;

        // Creamos nuestra rutaMapa
        rutaMapa = new RutaMapa(req.body);

        await rutaMapa.save();
        res.send(rutaMapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}