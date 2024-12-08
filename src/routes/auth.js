const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcrypt');

const router = Router();

// Crear un nuevo usuario
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
                     return res.status(400).json({ mensaje: "El usuario ya existe" });
              }

              // Validamos contraseña
              const esIgual = bcrypt.compareSync(req.body.password, existeUser.password);
              if (!esIgual) {
                     return res.status(400).json({ mensaje: "La contraseña es incorrecta" });
              }


              // Generamos el token

              const token = generarJWT(user)
              res.json({
                     _id: existeUser._id, nobre: existeUser.nombre, email: existeUser.email, rol: existeUser.rol
              });

       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

module.exports = router;