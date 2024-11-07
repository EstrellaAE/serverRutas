const Ruta = require("../models/Ruta");

// Trae lista de rutas de la BD
exports.obtenerRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find();
        res.json(rutas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al obtener las rutas');
    }
};

// Inserta una nueva ruta
exports.crearRuta = async (req, res) => {
    try {
        const { nombre, descripcion, horario, precio } = req.body;
        
        if (!nombre || !descripcion || !horario || !precio) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        // Creamos  ruta
        let ruta = new Ruta(req.body);

        await ruta.save();
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear la ruta');
    }
};

// Edita una ruta existente por su ID
exports.editarRuta = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validar que la ruta exista
        let ruta = await Ruta.findById(id);
        if (!ruta) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        // Actualizar la ruta
        ruta = await ruta.editar(data);
        res.json(ruta);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al editar la ruta');
    }
};

// Elimina una ruta por su ID
exports.eliminarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        // Elimina la ruta directamente
        const rutaEliminada = await Ruta.findByIdAndDelete(id);
        if (!rutaEliminada) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        res.json({ msg: 'Ruta eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la ruta');
    }
};

// Activa una ruta por su ID
exports.activarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que la ruta exista
        let ruta = await Ruta.findById(id);
        if (!ruta) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        // Activar la ruta
        await ruta.activar();
        res.json({ msg: 'Ruta activada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al activar la ruta');
    }
};

// Desactiva una ruta por su ID
exports.desactivarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        // Validar que la ruta exista
        let ruta = await Ruta.findById(id);
        if (!ruta) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        // Desactivar la ruta
        await ruta.desactivar();
        res.json({ msg: 'Ruta desactivada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al desactivar la ruta');
    }
};
