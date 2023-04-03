

//aqui vamos a craer el modelos de usuarios

// este modelo es como va a lucir mas o menos cada registro en mi base de datos
const {Schema, model} = require('mongoose')

//esto la definicion de cada uno de los registros , que va estar dentro de una coleccion o una tabla
// de usuarios
// asi lucira mi modelo de usuario
const UsuarioShema = Schema({
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,

    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    },
    google:{
        type: Boolean,
        default:false
    }
});


UsuarioShema.method('toJSON', function(){
 const {__v, _id,password, ...object} =  this.toObject();
 object.uid = _id
 return object
})


// ahora exponemos este modelo
// ala la hora de crear la tabla moogose lo pondra en plural es decir Usuario por Usuarios
module.exports = model('Usuario', UsuarioShema)