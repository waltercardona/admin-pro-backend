/*
    Medicos:
    ruta: /api/medicos
*/

const {Router} = require('express');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos, getMedicoById  } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const router  = Router();

router.get('/',validarJWT,getMedicos)

router.post('/',[
    validarJWT,
    check('nombre','nomnbre del medico es necesario').not().isEmpty(),
    check('hospital','el hospital id debe de ser valido ').isMongoId(),
    validarCampos
], crearMedicos)

router.put('/:id',
validarJWT,
check('nombre','nombre del medico es necesario').not().isEmpty(),
check('hospital','el hospital id debe de ser valido ').isMongoId(),
validarCampos,
actualizarMedicos)

router.delete('/:id', validarJWT, borrarMedicos)

router.get('/:id', validarJWT, getMedicoById)

//Nota no olvidar exportar el modulo

module.exports = router
