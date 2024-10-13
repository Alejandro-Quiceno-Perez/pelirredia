const { Router } = require('express');
const ProductoraSchema = require('../models/Productora');
const { validationResult, check } = require('express-validator');
const Productora = require('../models/Productora');

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
        productora.fechaCreacion = req.body.fechaCreacion;
        productora.fechaActualizacion = req.body.fechaActualizacion;
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
        productora.fechaCreacion = req.body.fechaCreacion;
        productora.fechaActualizacion = req.body.fechaActualizacion;
        productora.slogan = req.body.slogan || productora.slogan; 
        productora.descripcion = req.body.descripcion || productora.descripcion; 

        productora = await productora.save(); 
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar la productora');
    }
});

// Listar por Id
router.get('/productora/:id', (req,res) => {
    const { id } = req.params;
    ProductoraSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

router.delete('/productora/:id', (req,res) => {
    const { id } = req.params;
    ProductoraSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
})


module.exports = router;