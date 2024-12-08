/**
 * Importa el módulo necesario.
 */
const jwt = require('jsonwebtoken');

/**
 * Middleware para validar el rol de administrador.
 * 
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función next de Express para pasar al siguiente middleware.
 * @returns {Object} - Responde con un estado 401 si el rol no es 'ADMIN'.
 */
const validarRolAdmin = (req, res, next) => {
   // Verifica si el rol del usuario es 'ADMIN'
   if (req.payload.rol !== 'ADMIN') {
      return res.status(401).json({ mensaje: 'Error unauthorized' });
   }
   next();
};

/**
 * Exporta el middleware de validación de rol de administrador.
 * 
 * @module validarRolAdmin
 */
module.exports = {
   validarRolAdmin
};