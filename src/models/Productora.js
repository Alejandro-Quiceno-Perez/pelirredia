const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: String,
        required: true
    },
    fechaActualizacion: {
        type: String,
    },
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    }
});

module.exports = model('Productora', ProductoraSchema);