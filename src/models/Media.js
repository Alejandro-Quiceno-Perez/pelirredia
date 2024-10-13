const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    imagenPortada: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: String,
        required: true
    },
    fechaActualizacion: {
        type: String,
    },
    añoEstreno: {
        type: String,
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