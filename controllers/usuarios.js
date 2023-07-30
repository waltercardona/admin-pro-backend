
//imprtamos el modelo
const {response} = require('express')
//aqui importamos algo que viene de express-validator para usarlo para las validacinos

//importamos el paquete para encriptar la contraseña

const bcryp = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')


// dentro de este archico solo abran funciones que yo voy a despues exportar
//esta es la logica que va ha hacer cada una de mis rutas

const getUsuarios = async(req,res )=>{
    // vamos a hacer una paginacion

    const desde = Number(req.query.desde) || 0
    
    //aqui obtengo los usarios que estan en la base de datos
    const usuarios = await Usuario.find({}, 'nombre role  email password google img')
                                  .skip(desde)
                                  .limit(5)
    const total = await Usuario.count();

//    const [ usuarios, total] = await Promise.all([
//         Usuario
//             .find({}, 'nombre role  email password google img')
//             .skip(desde),
//             limit(5),
//         Usuario.count()
//     ])
    // req: es lo que  se solicita, ahi viene la informacion de los header, que cliente fue,  entre otras cosas
    // res: es lo que nosotros vamos o el servidor va a responderle  al cliente que acaba de solicitar algo en el backend 
    res.json({
       ok: true,
       usuarios,
       total
      
    })
}

//Crear usuarios

const crearUsuarios = async(req ,res = response) => {
   //aqui vamos a usar el modelo, lo primero que debemos hacer es importar el modelo

  

   const { email,password } = req.body


//    await Hospital.findOneAndRemove({_id:hospitalId})
    //con esto estamos validando que el correo no exista dos veces
   try {
    // aqui obtenemos un registro para compararlo
    const existeEmail = await Usuario.findOne({email})
    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg:' El correo ya existe'
        })
    }

    const usuario = new Usuario(req.body)
    

    //video 112 proceso para encriptar la contraseña
    // encriptar contraseña
    const salt = bcryp.genSaltSync();
    usuario.password = bcryp.hashSync(password, salt)

    //guardar usuario
    await usuario.save()

       //generar el token -JWT

       const token = await generarJWT(usuario.id)
      res.json({
          ok:true,
          usuario,
          token
      })
    
   } catch (error) {
    console.log(error)
    res.status(500).json({
        ok:false,
        msg:'ocurrio un error inesperado .... revise los logs'
    })
   }

   

  
}

//video 113 controlador para el put de usuario (actualizar)

const actualizarUsuario = async(req, res= response) => {
//por hacer: validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);
       
        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario por ese id'
            })
        }

        //actualizaciones
        const {password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email) {
      
            const existeEmail  = await Usuario.findOne({ email})
            if (existeEmail) {

                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese email'
                })
                
            }
        }

        
        
        
        // se puede hacer de varias maneras
        
        // lo vamos ha hcer de la siguiente manare
        
        
        // delete campos.password ya no es necesario estos dos campos ya que 
        //los desestructure arriba en la linea 91
        // delete campos.google; ya no es necesario estos dos campos ya que 
        //los desestructure arriba en la linea 91
        
        if (!usuarioDB.google) {
            campos.email = email;
            
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
            ok:false,
            msg: 'Usuarios de google no pueden cambiar su correo '
        })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true})
        
        res.json({
            ok:true,
            usuarioActualizado
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'error insesperado al actualizar..'
        })
    }
}

 const borrarUsuario = async(req, res= response) => {
    const uid = req.params.id; //aqui obtenemos el id que viene en la url
    try {
        const usuarioDB = await Usuario.findById(uid);  // buscamos ese id

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid)


        res.json({
            ok:true,
            msg:' Usuario eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error insesperado al borrar..'
        })

    }
 }

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}