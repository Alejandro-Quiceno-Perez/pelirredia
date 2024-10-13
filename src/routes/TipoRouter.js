const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

//LISTAR, CREAR Y ACTUALIZAR, ELIMINAR

// GET method route
router.get('/tipo', async function (req, res) {

    try {

        const tipos = await Tipo.find(); // select * from 
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error')
    }

});

// POST method route
router.post('/tipo', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = req.body.fechaCreacion;
        tipo.fechaActualizacion = req.body.fechaActualizacion;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Tipo')

    }

});

// PUT method route
router.put('/tipo/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = await Tipo.findById(req.params.id); //select * from tipo where id = ?

        if (!tipo) {
            return res.status(400).send('Tipo no existe');
        }

        tipo.nombre = req.body.nombre;
        tipo.fechaCreacion = req.body.fechaCreacion;
        tipo.fechaActualizacion = req.body.fechaActualizacion;
        tipo.descripcion = req.body.descripcion;

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear Tipo')

    }

});

router.delete('/tipo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tipo = await Tipo.findByIdAndDelete(id);
        if (!tipo) {
            return res.status(404).send({ message: 'Tipo no encontrado' });
        }
        res.status(200).send({ message: 'Tipo eliminado exitosamente'});
    } catch (error) {
        res.status(500).send(error)
    }
})

// bucar por id
router.get('/tipo/:tipoId', async function (req, res) {
    try {
        const tipo = await Tipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }
        res.status(200).json(tipo)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Ocurrió un error');
    }
})

module.exports = router;
