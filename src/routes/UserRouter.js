/**
 * Importa los módulos necesarios.
 */
const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const bcrypt = require('bcrypt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

/**
 * Crea una instancia del enrutador de Express.
 */
const router = Router();

/**
 * @route POST /users
 * @description Crea un nuevo usuario.
 * @access Private (requiere autenticación y rol de administrador)
 */
router.post('/users', [validarJWT, validarRolAdmin], [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El email es obligatorio').isEmail(),
       check('password', 'La contraseña es obligatoria').not().isEmpty(),
       check('estado', 'El estado es inválido').isIn(['ACTIVO', 'INACTIVO']),
       check('rol', 'El rol es inválido').isIn(['ADMIN', 'DOCENTE'])
], async (req, res) => {
       try {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              const existeUser = await User.findOne({ email: req.body.email });
              if (existeUser) {
                     return res.status(400).send('El usuario ya existe');
              }

              // Encriptar la contraseña
              const salt = bcrypt.genSaltSync();
              const hashedPassword = bcrypt.hashSync(req.body.password, salt);

              // Crear el nuevo usuario con la contraseña encriptada
              let user = new User({
                     nombre: req.body.nombre,
                     email: req.body.email,
                     password: hashedPassword,
                     estado: req.body.estado,
                     rol: req.body.rol,
                     fechaCreacion: new Date(),
                     fechaActualizacion: new Date()
              });

              user = await user.save();
              res.send(user);
       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * @route GET /users
 * @description Obtiene todos los usuarios.
 * @access Private (requiere autenticación y rol de administrador)
 */
router.get('/users', [validarJWT, validarRolAdmin], async (req, res) => {
       try {
              const users = await User.find();
              res.status(200).json(users);
       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * @route GET /users/:userId
 * @description Obtiene un usuario por ID.
 * @access Public
 */
router.get('/users/:userId', async (req, res) => {
       try {
              const user = await User.findById(req.params.userId);
              if (!user) {
                     return res.status(404).json({ mensaje: "Usuario no encontrado" });
              }
              res.status(200).json(user);
       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * @route PUT /users/:userId
 * @description Actualiza un usuario por ID.
 * @access Private (requiere autenticación y rol de administrador)
 */
router.put('/users/:userId', [validarJWT, validarRolAdmin], [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El email es obligatorio').isEmail(),
       check('password', 'La contraseña es obligatoria').not().isEmpty(),
       check('estado', 'El estado es inválido').isIn(['ACTIVO', 'INACTIVO']),
       check('rol', 'El rol es inválido').isIn(['ADMIN', 'DOCENTE'])
], async (req, res) => {
       try {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              let user = await User.findById(req.params.userId);
              if (!user) {
                     return res.status(404).json({ mensaje: "Usuario no encontrado" });
              }

              user.nombre = req.body.nombre;
              user.email = req.body.email;
              user.password = req.body.password;
              user.estado = req.body.estado;
              user.rol = req.body.rol;
              user.fechaActualizacion = new Date();

              user = await user.save();
              res.status(200).json(user);
       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * @route DELETE /users/:userId
 * @description Elimina un usuario por ID.
 * @access Private (requiere autenticación y rol de administrador)
 */
router.delete('/users/:userId', async (req, res) => {
       try {
              const user = await User.findByIdAndDelete(req.params.userId);
              if (!user) {
                     return res.status(404).json({ mensaje: "Usuario no encontrado" });
              }
              res.status(200).json({ mensaje: "Usuario eliminado" });
       } catch (error) {
              console.log(error.message);
              res.status(500).json({ mensaje: "Ocurrió un error" });
       }
});

/**
 * Exporta el enrutador.
 * 
 * @module UserRouter
 */
module.exports = router;