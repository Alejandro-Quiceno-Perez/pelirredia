/**
 * Importa el módulo necesario.
 */
const jwt = require('jsonwebtoken');

/**
 * Middleware para validar tokens JWT.
 * 
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función next de Express para pasar al siguiente middleware.
 * @returns {Object} - Responde con un estado 401 si el token no es válido o no está presente.
 */
const validarJWT = (req, res, next) => {
    // Obtiene el token del encabezado de autorización
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ mensaje: 'Error unauthorized' });
    }

    try {
        // Verifica el token y obtiene el payload
        const payload = jwt.verify(token, '123456');
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensaje: 'Error unauthorized' });
    }
};

/**
 * Exporta el middleware de validación JWT.
 * 
 * @module validarJWT
 */
module.exports = {
    validarJWT
};