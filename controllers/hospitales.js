

// controladores para hospitales video 125

const { response } = require("express");

const Hospital = require('../models/hospital')

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre')
    res.json({
        ok:true,
        hospitales
    })
}

const crearHospitales = async(req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    
    try {
       

      const hospitalDB =  await hospital.save();
        
        res.json({
            ok:true,
           hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el admistrador'
        })
        
    }

  
}

const actualizarHospitales = async(req, res = response) => {
    

    const hospitalId = req.params.id

    const uid = req.uid

    try {
        const hospital = await Hospital.findById(hospitalId)

        if (!hospital) {
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado por ese id'
            })
            
        }
        //si llega a este punto es por que l hospital existe nos preparamos para actualizarlo

        //actualizar hospital

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true})



        res.json({
            ok:true,
            msg:'Hospital actualizado',
            hospitalActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admistrdor'
        })
        
    }


}

const borrarHospitales = async(req, res = response) => {
  
    const hospitalId = req.params.id

   

    try {
        const hospital = await Hospital.findById(hospitalId)

        if (!hospital) {
            return res.status(404).json({
                ok:true,
                msg:'Hospital no encontrado por ese id'
            })
            
        }
        //si llega a este punto es por que l hospital existe nos preparamos para borrarlo

        //borrar hospital hospital

      
        await Hospital.findOneAndDelete(hospitalId)
        


        res.json({
            ok:true,
            msg:'Hospital eliminado',
           
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admistrdor'
        })
        
    }
}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}