/*
    hospitales:
    ruta: /api/hospitales
*/

 //aqui vamos a craar las rutas
 const {Router} = require('express');//vamos a importar algo que viene de express-validator para usar los middlewares
 
 const {check} = require('express-validator')

 const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
} = require('../controllers/hospitales')
 
 
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();//con el Router me va permitir configurar las rutas


router.get( '/',  getHospitales)//ruta para obtener los hospitales


router.post('/',[
    validarJWT,
    check('nombre','el nombre del hospital es requerido').not().isEmpty(),
    validarCampos
]
,  crearHospitales);


router.put('/:id', [], actualizarHospitales)


router.delete('/:id', borrarHospitales)



//Nota no olvidar exportar el modulo

module.exports = router