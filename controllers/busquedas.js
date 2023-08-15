const { response } = require("express");

const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospitales = require('../models/hospital');
const usuario = require("../models/usuario");



const getBusquedas = async(req, res = response)=> {

    // obtenemos lo que venga en la params

    const busqueda = req.params.busqueda;

   const regex = new RegExp(busqueda, 'i')

//    const usuarios = await Usuario.find({nombre:regex})
//    const medicos =  await Medicos.find({nombre:regex})
//    const hospitales = await Hospitales.find({nombre:regex})


//    vomos ha hcer el llamado de una sola vez por que con el codigo anterior son tres esperas
//con esto hacemos la busqueda de manera general
const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({nombre:regex}),
    Medico.find({nombre:regex}),
    Hospitales.find({nombre:regex})
])

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })



}

const getDocumentosColeccion = async(req, res = response)=> {

    // obtenemos lo que venga en la params

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i')

        data = []


//aqui haremos la busquena de manera singular
    switch (tabla) {
        case 'medicos':
         data = await   Medico.find({nombre:regex})
                              .populate('usuario', 'nombre email')
                              .populate('hospital','nombre ')
        break;

        case 'hospitales':
         data = await  Hospitales.find({nombre:regex})
        break;

        case 'usuarios':
          data = await  Usuario.find({nombre:regex})
         
        break;
    
        default:
           return res.status(400).json({
                ok:false,
                msg:'la tabla tiene que ser usuarios/medicos/hospitales'
            })
    }

    res.json({
        ok:true,
        resultados: data
    })

// const [usuarios, medicos, hospitales] = await Promise.all([
//     Usuario.find({nombre:regex}),
//     Medicos.find({nombre:regex}),
//     Hospitales.find({nombre:regex})
// ])

//     res.json({
//         ok:true,
//         usuarios,
//         medicos,
//         hospitales
//     })



}

module.exports= {
    getBusquedas,
    getDocumentosColeccion
}