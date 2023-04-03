//importamos la libreria

const jwt = require('jsonwebtoken');

// generar el jwt
// esta funcion se necesita que sea sincrono la vamos a transformar para cuando se ejecute en el controlador
const generarJWT = ( uid )=>{
    
    return new Promise((resolve,reject)=>{
        const payload = {
            // recordar que el payload se puede grabar lo que sea, siempre y cuando no sea infromacion sencible
            uid
        }
        // el jwt.sign es para crearlo
        jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (error, token) => {
           if (error) {
            console.log(error)
            reject('No se pudo generar el JWT')
           } else {
            resolve(token)
            
           }
        })
    
    })
//un token es utilizado para mantener de forma pasiva el estado del usuario en la aplicacion
// el jwt consta de tres partes:
// el header ,
//  el payload y la firma
//para tener en cuenta que lo que se almacena en el payload no debe de ser infirmacion sencible como contraseñas

// para generar la firma se ocupa una palabra secreta o alguna semilla con el cual se va a firmar los tokens

// creamos un payload

    

}


module.exports = {
    generarJWT
}