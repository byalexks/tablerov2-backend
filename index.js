const express = require('express');
const cors = require('cors');
require('dotenv').config()
const {dbConnection} = require('./database/config')



//crear el servidor de express
const app = express();

// base de datos
dbConnection();

// Cors
app.use( cors() ) 


// lectura y parseo del body
app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/board', require('./routes/board') );




// escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`serivdor corriendo en puerto ${process.env.PORT}`);
} )