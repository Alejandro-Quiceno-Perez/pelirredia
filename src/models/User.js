/**
 * Importa los módulos necesarios de Mongoose.
 */
const { Schema, model } = require('mongoose');

/**
 * Define el esquema para el modelo de usuario.
 * 
 * @typedef {Object} UserSchema
 * @property {string} nombre - El nombre del usuario. Es un campo obligatorio.
 * @property {string} email - El correo electrónico del usuario. Es un campo obligatorio y debe ser único.
 * @property {string} password - La contraseña del usuario. Es un campo obligatorio.
 * @property {Date} fechaCreacion - La fecha de creación del registro. Se establece automáticamente a la fecha y hora actuales.
 * @property {Date} fechaActualizacion - La fecha de actualización del registro. Se establece automáticamente a la fecha y hora actuales.
 * @property {string} estado - El estado del usuario. Es un campo obligatorio y debe ser uno de los valores 'ACTIVO' o 'INACTIVO'.
 * @property {string} rol - El rol del usuario. Es un campo obligatorio y debe ser uno de los valores 'ADMIN' o 'DOCENTE'.
 */
const UserSchema = new Schema({
       nombre: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
       fechaCreacion: { type: Date, default: Date.now },
       fechaActualizacion: { type: Date, default: Date.now },
       estado: { type: String, required: true, enum: ['ACTIVO', 'INACTIVO'] },
       rol: { type: String, required: true, enum: ['ADMIN', 'DOCENTE'] }
});

/**
 * Exporta el modelo de usuario basado en el esquema definido.
 * 
 * @module User
 */
module.exports = model('User', UserSchema);