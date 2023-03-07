require('dotenv').config(); //con esto leo las variables de entorno 

const express = require('express');
var cors = require('cors')
const { dbConnection } = require('./database/config')
 

//crear el servidor  de express
const app = express()


//Configurar CORS
app.use(cors())

//base de datos

dbConnection();

console.log(process.env);

// WjU8kNUYN5F1NKrP
// mean_user
// mongodb+srv://walterc:<password>@midata.rgasyym.mongodb.net/hospitaldb
// mongodb+srv://mean_user:*****@midata.rgasyym.mongodb.net/hospitaldb?authSource=admin&replicaSet=atlas-byfjpd-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
//Rutas:
// aqui vamos a crear la primera ruta de mi aplicacion, para comprender como son las consultas que se hacen a los diferentes
// endpoint


app.get( '/', (req,res)=>{
    
    // req: es lo que  se solicita, ahi viene la informacion de los header, que cliente fue,  entre otras cosas
    // res: es lo que nosotros vamos o el servidor va a responderle  al cliente que acaba de solicitar algo en el backend 
    res.json({
        ok: true,
        msg:'todo salio bien'
    })
})

app.listen(process.env.PORT, ()=> {
    console.log('puerto corriendo en puerto' + process.env.PORT);
});