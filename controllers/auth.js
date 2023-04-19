
/*
    paht:'/api/login'
*/
//nos creamos el controlador para el login

const { response } = require("express");

const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleverify } = require("../helpers/google-verify");


const login = async(req, res = response) => {

    //vamos a extraer lo que viene el en body

    const {email, password} = req.body 
   
    try {

        //validar email
        const usuarioDB = await  Usuario.findOne({email})

        if (!usuarioDB) {
            return res.status(400).json({
                ok:false,
                msg:'email no encontrado' 
            })
            
        }
        //validar contraseña
        const validarpassword = bcrypt.compareSync(password, usuarioDB.password)//con esto se compara las dos contraseñas para que sean las mismas

        if (!validarpassword) {
            return res.status(400).json({
                ok:false,
                msg:'las contraseñas no son las mismas'
            })
            
        }

        //generar el token -JWT

        const token = await generarJWT(usuarioDB.id)


        res.json({
            ok:true,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:' consulte con el admistrador...'
        })
    }

}

const googleSingIn = async(req,res = response) => {

    try {
       const {name, email, picture} = await googleverify(req.body.token) //llamamos la funcion

    //    verificamos si el email ya existe

    const usuarioDB = await Usuario.findOne({email})
    let usuario;
    if (!usuarioDB) {
        usuario = new Usuario({
            nombre: name,
            email: email,
            password: '@@@',
            img:picture,
            google: true

        })
        
    } else {

        usuario = usuarioDB,
        usuario.google = true

        
    }

    //guardar usuario
    await usuario.save()


        //generar el token -JWT

        const token = await generarJWT(usuario.id)
       res.json({
        ok:true,
        name, email, picture,
        token
       })
    
   } catch (error) {
    console.log(error);
       res.status(500).json({
            ok:false,
            msg:'token de google no es correcfo'
        })
    
   } 
   
}


module.exports = {
    login,
    googleSingIn
}