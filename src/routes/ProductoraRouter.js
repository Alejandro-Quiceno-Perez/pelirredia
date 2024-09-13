const { Router } = require('express');
const ProductoraSchema = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// GET method route
router.get('/productora', async function (req, res) {
    try {
        const productoras = await ProductoraSchema.find(); // select * from productoras
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

// POST method route
router.post('/productora', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = new ProductoraSchema(); 
        productora.nombre = req.body.nombre; 
        productora.estado = req.body.estado;
        productora.fechaCreacion = new Date();
        productora.fechaActualizacion = new Date();
        productora.slogan = req.body.slogan || ''; 
        productora.descripcion = req.body.descripcion || '';

        productora = await productora.save(); 
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear la productora');
    }
});


// PUT method route
router.put('/productora/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let productora = await ProductoraSchema.findById(req.params.id);
        if (!productora) {
            return res.status(400).send('La productora no existe');
        }

        productora.nombre = req.body.nombre; 
        productora.estado = req.body.estado;
        productora.fechaActualizacion = new Date();
        productora.slogan = req.body.slogan || productora.slogan; 
        productora.descripcion = req.body.descripcion || productora.descripcion; 

        productora = await productora.save(); 
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la productora');
    }
});


module.exports = router;