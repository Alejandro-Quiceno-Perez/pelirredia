const { Schema, model } = require('mongoose')

const GeneroSchema = Schema({
       nombre: {
              type: String,
              required: true
       },
       estado: {
              type: Boolean,
              required: true
       },
       fechaCreacion: {
              type: String
       },
       fechaActualizacion: {
              type: String
       },
       descripcion: {
              type: String,
              required: true
       }
});

module.exports = model('Genero', GeneroSchema);