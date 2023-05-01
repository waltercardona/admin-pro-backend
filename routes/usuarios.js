

 /*
    rutas: /api/usuarios
 */
 //aqui vamos a craar las rutas
 const {Router} = require('express');//vamos a importar algo que viene de express-validator para usar los middlewares
 
 const {check} = require('express-validator')
 
 const { getUsuarios,
        crearUsuarios,
        actualizarUsuario ,
        borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



 const router = Router();//con el Router me va permitir configurar las rutas


 router.get( '/', validarJWT, getUsuarios)//ruta para obtener los usuarios


//video de 110 usaremos el express-validator para hacer validaciones y se usa como un middleware
// un middleware son funciones que se ejecutan antes de llegar a otras
// y uno de los usos que se le dan es verificar que la informacion venga como nosotros la necesitamos
// para esto vamos a usar nuestro express-validator

//ruta para crear usuarios
router.post('/',
   [
      // validarJWT,
      // se usan [] cuando vamos a usar varias middlewares validamos campos obligatorios
      check('nombre', 'el nombre es obligatorio').not().isEmpty(),
      check('password','el password es obligatorio').not().isEmpty(),
      check('email','el role es obligatorio').isEmail(),
      validarCampos
   ],
   crearUsuarios);



   // video 113 put de usuario  (actualizar)

   router.put('/:id',
   [
      validarJWT,
      check('nombre', 'el nombre es obligatorio').not().isEmpty(),
      check('email','el email es obligatorio').isEmail(),
      check('role','el role es obligatorio').not().isEmpty(),
      validarCampos
   ],
    actualizarUsuario)

   //  video 115 borrar usuario

   router.delete('/:id',validarJWT, borrarUsuario)



//Nota no olvidar exportar el modulo

module.exports = router