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
              type: String,
              required: true
       },
       fechaActualizacion: {
              type: String,
              required: true
       },
       descripcion: {
              type: String,
              required: true
       }
});

module.exports = model('Genero', GeneroSchema);