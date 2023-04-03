require('dotenv').config(); //con esto leo las variables de entorno 

const express = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config')
 

//crear el servidor  de express
const app = express()


//Configurar CORS
app.use(cors())

//lectura y parse del body

app.use(express.json())

//base de datos

dbConnection();

// console.log(process.env);

// WjU8kNUYN5F1NKrP
// mean_user
// mongodb+srv://walterc:<password>@midata.rgasyym.mongodb.net/hospitaldb
// mongodb+srv://mean_user:*****@midata.rgasyym.mongodb.net/hospitaldb?authSource=admin&replicaSet=atlas-byfjpd-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
//Rutas:
// aqui vamos a crear la primera ruta de mi aplicacion, para comprender como son las consultas que se hacen a los diferentes
// endpoint

// en el video 106 vamos separar lo qur son las rutas y el controlador
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));

//cracion  de la ruta para el login

app.use('/api/login', require('./routes/auth')); //esta es la ruta del login de mi aplicacion

    


app.listen(process.env.PORT, ()=> {
    console.log('puerto corriendo en puerto' + process.env.PORT);
});