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
              type: Date,
              required: true
       },
       fechaActualizacion: {
              type: Date,
              required: true
       }
});

module.exports = model('Director', DirectorSchema);