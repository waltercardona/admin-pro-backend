
//video 116 vamos a trabajar con el login 


const {Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//esta es la ruta para en envio del login
router.post('/',
//se validan (middlewares)los campos para que se llenen los campos y no esten vacios
     [
        check('email', 'el email es requerio').isEmail(),
        check('password', 'la contraseña es requerida').not().isEmpty()
     ], validarCampos,
     login //controlador 
   )



module.exports = router;