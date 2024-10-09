const {Schema, model} = require('mongoose');

const DirectorSchema = Schema({
       nombres: {
              type: String,
              required: true
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
              required: true
       }
});

module.exports = model('Director', DirectorSchema);