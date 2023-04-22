
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


const actualizarMedicos = async(req, res = response) => {
   
    const medicoId = req.params.id

    const uid = req.uid

   

    try {

        const medico = await Medicos.findById(medicoId)
        if (!medico) {
            return res.status(404).json({
                ok:true,
                msg:'medico no encontrado por ese id'
            })
            
        }
        //si llega a este punto es por que el medico existe nos preparamos para actualizarlo

        //actualizar medico

        const cambiosmedicos = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate(medicoId,cambiosmedicos, {new:true})

        res.json({
            ok:true,
            medicoActualizado
        })
      
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admistrador'
        })

    }
  

}

const borrarMedicos = async(req, res = response) => {
    const medicoId = req.params.id

    try {

        const medico = await Medicos.findById(medicoId)
        if (!medico) {
            return res.status(404).json({
                ok:true,
                msg:'medico no encontrado por ese id'
            })
            
        }
        //si llega a este punto es por que el medico existe nos preparamos para actualizarlo

        //borrar medico

        const medicoborrado = await Medicos.findOneAndDelete(medicoId)

        res.json({
            ok:true,
            medicoborrado,
            msg:'medico borrado'
        })
      
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'hable con el admistrador'
        })

    }
}



module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}