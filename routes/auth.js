
//video 116 vamos a trabajar con el login 


const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleSingIn, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//esta es la ruta para en envio del login
router.post('/',
//se validan (middlewares)los campos para que se llenen los campos y no esten vacios
     [
       check('email', 'el email es requerio').isEmail(),
       check('password', 'la contraseña es requerida').not().isEmpty()
     ], 
     validarCampos,
     login //controlador 
   )

   router.post('/google',
   //se validan (middlewares)los campos para que se llenen los campos y no esten vacios
     [
      check('token', 'el token de google es obligatorio').not().isEmpty()
     ], validarCampos,
     googleSingIn //controlador 
   )

   router.get('/revalidarToken', validarJWT , revalidarToken //controlador 
   )



module.exports = router;