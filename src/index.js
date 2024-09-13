const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// importamos todas las rutas de User
const directorRouter = require('./routes/DirectorRouter');
const generoRouter = require('./routes/GeneroRouter');
// const mediaRouter = require('./routes/MediaRouter');
const productoraRouter = require('./routes/ProductoraRouter');
const tipoRouter = require('./routes/TipoRouter');

const app = express();
const port = process.env.PORT || 9000;

// middelware
app.use(express.json());
//Middleware
app.use('/api', directorRouter);
app.use('/api', generoRouter);
// app.use('/api', mediaRouter);
app.use('/api', productoraRouter);
app.use('/api', tipoRouter);

//routes
app.get('/', (req, res) => {
       res.send('Hello World');
})

//mongo db conection 
mongoose.connect(process.env.ACTIVIDAD2_IUD_ACTUALIZADA)
       .then(() => console.log('Conected mongoDB_Atlas'))
       .catch((error) => console.error(error.message));


app.listen(port, () => console.log('Server Listening on port' , port));

//  User: alejandroquiceno
// Password: etolia5Z2URNI0Ej
// IP: 177.255.144.191