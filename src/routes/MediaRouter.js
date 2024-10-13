const { Router } = require('express');
const MediaSchema = require('..//models/Media')
const { validationResult, check } = require('express-validator')

const router = Router();

router.post('/media', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url', 'invalid.url').not().isEmpty(),
    check('imagenPortada', 'invalid.imagenPortada').not().isEmpty(),
    check('fechaCreacion', 'invalid.fechaCreacion').not().isEmpty(),
    check('fechaActualizacion', 'invalid. fechaActualizacion').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('generoPrincipal', 'invalid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal', 'invalid.directorPrincipal').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeMediaPorSerial = await MediaSchema.findOne({ serial: req.body.serial });
        if (existeMediaPorSerial) {
            return res.status(400).send('Ya existe ese serial.');
        }

        let media = new MediaSchema();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagenPortada = req.body.imagenPortada;
        media.fechaCreacion = req.body.fechaCreacion;
        media.fechaActualizacion = req.body.fechaActualizacion;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('Error request:', error.request);
        } else {
            // Algo pasó al configurar la solicitud que desencadenó un error
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
        res.status(500).send('Ocurrió un error al crear el medio.');
    }
});

router.get('/media', async function (req, res) {
    try {
        const medios = await MediaSchema.find().populate([
            {
                path: 'generoPrincipal', select: 'nombre estado'
            },
            {
                path: 'directorPrincipal', select: 'nombres estado'
            },
            {
                path: 'productora', select: 'nombre estado'
            },
            {
                path: 'tipo', select: 'nombre estado'
            }
        ]);
        res.send(medios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});


// router.put('/media/:id', [
//     check('serial', 'El serial es obligatorio').not().isEmpty(),
//     check('titulo', 'El título es obligatorio').not().isEmpty(),
//     check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
//     check('url', 'La URL es obligatoria').not().isEmpty(),
//     check('imagenPortada', 'La imagen de portada es obligatoria').not().isEmpty(),
//     check('añoEstreno', 'El año de estreno es obligatorio').not().isEmpty(),
//     check('generoPrincipal', 'El género principal es obligatorio').not().isEmpty(),
//     check('directorPrincipal', 'El director principal es obligatorio').not().isEmpty(),
//     check('productora', 'La productora es obligatoria').not().isEmpty(),
//     check('tipo', 'El tipo es obligatorio').not().isEmpty(),
// ], async function (req, res) {
//     try {

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ mensaje: errors.array() });
//         }

//         let media = await MediaSchema.findById(req.params.mediaId);
//         if (!media) {
//             return res.status(400).send('El medio no existe');
//         }

//         const existeMediaPorSerial = await MediaSchema.findOne({ serial: req.body.serial, _id: { $ne: media._id } });
//         if (existeMediaPorSerial) {
//             return res.status(400).send('Ya existe otro medio con ese serial');
//         }

//         media.serial = req.body.serial;
//         media.titulo = req.body.titulo;
//         media.sinopsis = req.body.sinopsis;
//         media.url = req.body.url;
//         media.imagenPortada = req.body.imagenPortada;
//         media.añoEstreno = req.body.añoEstreno;
//         media.generoPrincipal = req.body.generoPrincipal._id;
//         media.directorPrincipal = req.body.directorPrincipal._id;
//         media.productora = req.body.productora._id;
//         media.tipo = req.body.tipo._id;
//         media.fechaActualizacion = req.params.fechaActualizacion;

//         media = await media.save();
//         res.send(media);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Ocurrió un error al actualizar el medio.');
//     }
// });

router.put('/media/:id', async (req, res) =>{
    const {id} =req.params;
    try {
        const media = await MediaSchema.findByIdAndUpdate(id, req.body, {
            new: true, runValidators: true
        });
        if (!media) {
            return res.status(404).send({ message: "Media no encontrado" });
        }
        res.status(200).send(media);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Listar por id
router.get('/media/:mediaId', async function (req, res) {
    try {
        const media = await MediaSchema.findById(req.params.mediaId);
        if (!media) {
            return res.status(404).send('Media no encontrado');
        }
        res.status(200).json(media);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Ocurrió un error');
    }
});

router.delete('/media/:id', async (req,res) => {
    const { id } = req.params;
    try {
        const media = await MediaSchema.findByIdAndDelete(id);
        if (!media) {
            return res.status(404).send({ message: 'Media no encontrado' });
        }
        res.status(200).send({ message: 'Media eliminado exitosamente' });
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;