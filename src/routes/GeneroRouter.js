const express = require('express');
const GeneroSchema = require('../models/Genero');
const Genero = require('../models/Genero');

const router = express.Router();

//Crear genero
router.post('/generos', async (req, res) => {
       try {
              const genero = GeneroSchema(req.body);
              await genero.save();
              res.status(200).send(genero);

       } catch (error) {
              res.status(400).send(error.message);
       }
});

// Buscar
router.get('/generos', async (req, res) => {
       try {
              const generos = await GeneroSchema.find({})
              res.status(200).send(generos);
       } catch (error) {
              res.status(500).send(error.message)
       }
});

// Actualizar

router.put('/generos/:id', async (req, res) => {
       const { id } = req.params;
       try {
              const genero = await GeneroSchema.findByIdAndUpdate(id, req.body, {
                     new: true, runValidators: true
              });
              if (!genero) {
                     return res.status(404).send({ message: "Genero no encontrado" });
              }

              res.status(200).send(genero);
       } catch (error) {
              res.status(400).send(error.message)
       }
})

// Eliminar un género por ID
router.delete('/generos/:id', async (req, res) => {
       const { id } = req.params;
       try {
              const genero = await GeneroSchema.findByIdAndDelete(id);
              if (!genero) {
                     return res.status(404).send({ message: 'Género no encontrado' });
              }
              res.status(200).send({ message: 'Género eliminado exitosamente' });
       } catch (error) {
              res.status(500).send(error);
       }
});

// listar por ID
router.get('/generos/:generoId', async function(req, res) {
       try {
              const genero = await Genero.findById(req.params.generoId);
              if (!genero) {
                     return res.status(404).send('Género no encontrado');
              }
              res.status(200).json(genero);
       } catch (error) {
              console.log(error.message);
              res.status(500).send('Ocurrió un error');
       }
})

module.exports = router;