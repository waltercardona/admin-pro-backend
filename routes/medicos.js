/*
    Medicos:
    ruta: /api/medicos
*/

const {Router} = require('express');
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const router  = Router();

router.get('/', [],getMedicos)

router.post('/',[
    validarJWT,
    check('nombre','nomnbre del medico es necesario').not().isEmpty(),
    check('hospital','el hospital id debe de ser valido ').isMongoId(),
    validarCampos
], crearMedicos)

router.put('/:id', actualizarMedicos)

router.delete('/:id', borrarMedicos)

//Nota no olvidar exportar el modulo

module.exports = router
