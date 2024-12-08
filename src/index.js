const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// importamos todas las rutas de User
const directorRouter = require('./routes/DirectorRouter');
const generoRouter = require('./routes/GeneroRouter');
const mediaRouter = require('./routes/MediaRouter');
const productoraRouter = require('./routes/ProductoraRouter');
const tipoRouter = require('./routes/TipoRouter');
const userRouter = require('./routes/UserRouter');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 9000;

//mongo db conection 
const connectDb=async()=>{
       try {
              const database = await mongoose.connect(process.env.ACTIVIDAD2_IUD_ACTUALIZADA)
              console.log('Conected mongoDB_Atlas',database.connection.name)
       } catch (error) {
              console.log(error);
              
       }
}

connectDb()

// app.use(connectDb())
// middelware
app.use(express.json());
app.use(cors({origin:"*"}));

//Middleware

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', directorRouter);
app.use('/api', generoRouter);
app.use('/api', mediaRouter);
app.use('/api', productoraRouter);
app.use('/api', tipoRouter);

//routes
app.get('/', (req, res) => {
       res.send('Hello World');
})


app.listen(port, () => console.log('Server Listening on port' , port));



//  User: alejandroquiceno
// Password: etolia5Z2URNI0Ej
// IP: 177.255.144.191