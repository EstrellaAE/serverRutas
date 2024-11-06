const mongoose = require('mongoose');

// Esquema para las paradas en la ruta
const paradaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  coords: {
    type: [Number], // Array de dos elementos: [lat, lng]
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length === 2;
      },
      message: 'coords debe ser un array de dos números [lat, lng]'
    }
  }
});

// Esquema para la ruta con coordenadas y paradas
const rutaMapaSchema = new mongoose.Schema({
  ruta: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  coordinates: {
    type: [[Number]], // Array de arrays de números para [lat, lng]
    required: true,
    validate: {
      validator: function (arr) {
        return arr.every(coords => coords.length === 2);
      },
      message: 'Cada elemento en coordinates debe ser un array de dos números [lat, lng]'
    }
  },
  paradas: {
    type: [paradaSchema], // Array de documentos de paradas
    required: true
  }
});

module.exports = mongoose.model('RutaMapa', rutaMapaSchema);
