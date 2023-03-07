//este archivo tendra la configuracion de la base de datos 
// tendremos la configuracion de mongoose el orm

const mongoose = require('mongoose');

//creamos una funcion que sera la encargada de llamarla y establesca la conexxion ala db


const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online');
        
    } catch (error) {
        console.log(error)
        throw new Error('error a la hora de iniciar la db consultar los logs')
    }
}

//de esta manera exponemos o exportamos este objeto dbConnection para ser utilizado en otra parte del proyecto
module.exports = {
    dbConnection
}


