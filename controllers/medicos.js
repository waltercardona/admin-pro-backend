
const { response } = require('express');

const Medicos = require('../models/medico')



const getMedicos = async(req, res = response) => {

    const medicos = await Medicos.find()
                                 .populate('usuario', 'nombre email')
                                 .populate('hospital', 'nombre')
    res.json({
        ok:true,
       medicos
    })
}

const crearMedicos = async(req, res = response) => {
    const uid = req.uid;
   

const medico = new Medicos({
    usuario: uid,
   ...req.body
})
   try {

    const medicoDB = await medico.save()

      res.json({
        ok:true,
       medico:medicoDB
    })
    
   } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'hable con el admistrador'
    })
   }

  
}


const actualizarMedicos = (req, res = response) => {
    res.json({
        ok:true,
        msg:'actualizarMedicos'
    })
}

const borrarMedicos = (req, res = response) => {
    res.json({
        ok:true,
        msg:'borrarMedicos'
    })
}



module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}