const express = require('express');
const DirectorSchema = require('../models/Director');
const  { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = express.Router();

//Crear usuario
router.post('/director', [validarJWT,validarRolAdmin], (req, res) => {
       const director = DirectorSchema(req.body);
       director
              .save()
              .then((data) => res.json(data))
              .catch((error) => res.json(error));
});

//Obtener todos los usuarios 
// GET method route
router.get('/director', [validarJWT, validarRolAdmin], (req, res) => {
       DirectorSchema
              .find()
              .then((data) => res.json(data))
              .catch((error) => res.json({message: error}));
       
});

// Encontrar por nombre

router.get('/director/:id', (req, res) => {
       const { id } = req.params;
       DirectorSchema
              .findById(id)
              .then((data) => res.json(data))
              .catch((error) => res.json({message: error}));
})


// Actualizar Director
router.put('/director/:id', [validarJWT, validarRolAdmin], (req, res) => {
       const { id } = req.params;
       const { nombres, estado, fechaCreacion, fechaActualizacion } = req.body;

       DirectorSchema
              .updateOne({ _id: id }, { $set: { nombres, estado, fechaCreacion, fechaActualizacion }})
              .then((data) => res.json(data))
              .catch((error) => res.json({message: error}));
});

// Eliminar Director
router.delete('/director/:id', (req, res) => {
       const { id } = req.params;
       DirectorSchema
              .deleteOne({ _id: id })
              .then((data) => res.json(data))
              .catch((error) => res.json({message: error}));
});

module.exports = router;