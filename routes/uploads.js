/*
    Uploads:
    ruta: /api/uploads/
*/




const { Router} = require('express');

const expressFileUpload = require('express-fileupload');

const {validarJWT} = require('../middlewares/validar-jwt');
const { fileUploads, mostrarIMagen } = require('../controllers/uploads');



const router = Router();

router.use(expressFileUpload());


router.put('/:tipo/:id',validarJWT,fileUploads);

router.get('/:tipo/:foto',mostrarIMagen);




module.exports = router