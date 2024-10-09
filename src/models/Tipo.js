const { Schema, model } = require('mongoose')

const TipoSchema = Schema({
    nombre: { type: String,
        required: true 

    },
    fechaCreacion: { type: String,
        required: true 
    },
    fechaActualizacion: { type: String,
        required: true 
    },
    descripcion: { type: String,
        required : true 
    }
});

module.exports = model('Tipo', TipoSchema);

// SERIE, PELÍCULA