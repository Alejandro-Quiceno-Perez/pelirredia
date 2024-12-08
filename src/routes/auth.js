/**
 * Importa los módulos necesarios.
 */
const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helper/jwt');

/**
 * Crea una instancia del enrutador de Express.
 */
const router = Router();

/**
 * @route POST /login
 * @description Inicia sesión de un usuario.
 * @access Public
 */
router.post('/login', [
       check('email', 'El email es obligatorio').isEmail(),
       check('password', 'La contraseña es obligatoria').not().isEmpty()
], async (req, res) => {
       try {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              // Validamos el Email
              const existeUser = await User.findOne({ email: req.body.email });
              if (!existeUser) {
                     return res.status(400).json({ mensaje: "El usuario no existe" });
              }

              // Validamos contraseña
              const esIgual = bcrypt.compareSync(req.body.password, existeUser.password);
              if (!esIgual) {
                     return res.status(400).json({ mensaje: "La contraseña es incorrecta" });
              }

              // Generamos el token
              const token = generarJWT(existeUser);
              res.json({
                     _id: existeUser._id,
                     nombre: existeUser.nombre,
                     rol: existeUser.rol,
                     email: existeUser.email,
                     access_token: token
              });

       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * Exporta el enrutador.
 * 
 * @module AuthRouter
 */
module.exports = router;