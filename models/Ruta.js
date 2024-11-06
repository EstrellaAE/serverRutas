const mongoose = require('mongoose');

const rutaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    horario: {
        type: [String], // Array de strings para horarios
        required: [true, 'El horario es obligatorio'],
        validate: {
            validator: function(v) {
                return v.every(time => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time));
            },
            message: 'Cada horario debe tener el formato HH:MM-HH:MM'
        }
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
        validate: {
            validator: function(value) {
                return value >= 0; // Validación de que el precio no sea negativo
            },
            message: 'El precio no puede ser negativo'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    activa: {
        type: Boolean,
        default: true
    }
});

// Métodos de instancia para activar y desactivar rutas
rutaSchema.methods.activar = function() {
    console.log('Activando ruta...', this); 
    if (this.activa === true) {
        throw new Error('La ruta ya está activa');
    }
    this.activa = true;
    return this.save();
};

rutaSchema.methods.desactivar = function() {
    if (!this.activa) {
        throw new Error('La ruta ya está desactivada');
    }
    this.activa = false;
    return this.save();
};

// Método de instancia para editar una ruta
rutaSchema.methods.editar = function(data) {
    if (data.horario) {
        // Validar los horarios si se están modificando
        const horariosInvalidos = data.horario.filter(time => !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time));
        if (horariosInvalidos.length > 0) {
            throw new Error('Algunos horarios tienen un formato inválido');
        }
    }

    if (data.precio < 0) {
        throw new Error('El precio no puede ser negativo');
    }

    Object.assign(this, data); // Actualiza la instancia con los nuevos datos
    return this.save(); // Guarda los cambios
};

// Método estático para buscar rutas activas/inactivas
rutaSchema.statics.findByActiva = function(isActive) {
    return this.find({ activa: isActive });
};

// Método estático para actualizar una ruta por ID
rutaSchema.statics.editarRutaById = async function(id, data) {
    const ruta = await this.findById(id);
    if (!ruta) {
        throw new Error('Ruta no encontrada');
    }
    
    // Llamada al método de instancia para editar
    return await ruta.editar(data);
};

// Método estático para eliminar una ruta por ID
exports.eliminarRuta = async (req, res) => {
    try {
        const { id } = req.params;

        // Elimina la ruta directamente
        const rutaEliminada = await Ruta.findByIdAndDelete(id);
        console.log('Ruta eliminada: ', rutaEliminada); // Verifica la eliminación
        if (!rutaEliminada) {
            return res.status(404).json({ msg: 'Ruta no encontrada' });
        }

        res.json({ msg: 'Ruta eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la ruta');
    }
};



module.exports = mongoose.model('Ruta', rutaSchema);
