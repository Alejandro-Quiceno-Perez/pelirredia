const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    sinopsis: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    imagenPortada: {
        type: String,
        trim: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
}); 

module.exports = model('Media', MediaSchema);