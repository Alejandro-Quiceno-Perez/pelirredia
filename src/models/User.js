const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
       nombre : { type: String, required: true },
       email : { type: String, required: true, unique: true },
       password : { type: String, required: true },
       fechaCreacion : { type: Date, default: Date.now },
       fechaActualizacion : { type: Date, default: Date.now },
       estado : { type: String, required: true, enum:['ACTIVO', 'INACTIVO']},
       rol: { type: String, required: true, enum:['ADMIN', 'DOCENTE']}
});

module.exports = model('User', UserSchema);