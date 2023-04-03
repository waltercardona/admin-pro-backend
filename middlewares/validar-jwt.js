

//aqui vamos a hacer un middleware para validar  el JWT

const { response } = require("express");

const jwt = require ('jsonwebtoken')


// creamos una funcion para hacer la validacion

const validarJWT = (req, res=response, next) => {
    // leer el token
    const token = req.header('x-token');
    next()
if (!token) {
    return res.status(401).json({
        ok: false,
        msg:'no hay token en la peticion'
    })
    
}

try {

    const {uid} = jwt.verify(token,process.env.JWT_SECRET)

   req.uid = uid
    
} catch (error) {
    console.log(error);
    return res.status(401).json({
        ok:false,
        msg: ' Token no valido'
    })
}

  

    

   

}



// exportamos la funcion para porder usarla fuera de aqui 


module.exports = {
    validarJWT
}