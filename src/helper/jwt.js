/**
 * Importa el módulo necesario.
 */
const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT para un usuario.
 * 
 * @param {Object} usuario - El objeto de usuario que contiene los datos del usuario.
 * @returns {string} - El token JWT generado.
 */
const generarJWT = (usuario) => {
    // Define el payload con los datos del usuario
    const payload = { 
        _id: usuario._id, 
        nombre: usuario.nombre,
        email: usuario.email, 
        password: usuario.password, 
        rol: usuario.rol, 
        estado: usuario.estado 
    };

    // Firma el token con el payload y una clave secreta, y establece una expiración de 1 hora
    const token = jwt.sign(payload, '123456', { expiresIn: '1h' });
    return token;
};

/**
 * Exporta la función para generar tokens JWT.
 * 
 * @module generarJWT
 */
module.exports = {
    generarJWT
};