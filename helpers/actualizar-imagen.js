
//ocupamos los modelos los 3


const fs = require('fs')
 
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')


const borrarImagen = (path) =>{
    // const pathViejo = `./uploads/medicos/${medico.img}` // para verificar si existe usamos una funcion propia de node
    //verificamos si existe
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path)
        
    }
}

const actualizarImagen = async(tipo,id, nombreArchivo) =>{
    let pathViejo= ''
   switch (tipo) {
    case 'medicos':
        //verificar si existe un medico por el id
        const medico = await Medico.findById(id);

        if (!medico) {
            console.log('no se encontro medico por ese id');
            return false
        }
        //si llegamos a este punto quiere decir que si se encontro

        //evaluamos que ese medico tiene una imagen previamente asignaday si tiene una imagen previamente asignada 
        // hay que borrarla


        pathViejo = `./uploads/medicos/${medico.img}` // para verificar si existe usamos una funcion propia de node
        //verificamos si existe
        // if (fs.existsSync(pathViejo)) {
        //     //borrar la imagen anterior
        //     fs.unlinkSync(pathViejo)
            
        // }

        borrarImagen(pathViejo);

        medico.img = nombreArchivo;

         await medico.save();
         return true


        
    break;

    case 'hospitales':
             //verificar si existe un medico por el id
             const hospital = await Hospital.findById(id);

             if (!hospital) {
                 console.log('no se encontro hospital por ese id');
                 return false
             }
             //si llegamos a este punto quiere decir que si se encontro

             pathViejo = `./uploads/hospitales/${hospital.img}` // para verificar si existe usamos una funcion propia de node
             //verificamos si existe
             // if (fs.existsSync(pathViejo)) {
             //     //borrar la imagen anterior
             //     fs.unlinkSync(pathViejo)
                 
             // }
     
             borrarImagen(pathViejo);
     
             hospital.img = nombreArchivo;
     
              await hospital.save();
              return true
     
        
    break;

    case 'usuarios':
              //verificar si existe un medico por el id
              const usuario = await Usuario.findById(id);

              if (!usuario) {
                  console.log('no se encontro usuario por ese id');
                  return false
              }
              //si llegamos a este punto quiere decir que si se encontro
 
              pathViejo = `./uploads/usuarios/${usuario.img}` // para verificar si existe usamos una funcion propia de node
              //verificamos si existe
              // if (fs.existsSync(pathViejo)) {
              //     //borrar la imagen anterior
              //     fs.unlinkSync(pathViejo)
                  
              // }
      
              borrarImagen(pathViejo);
      
              usuario.img = nombreArchivo;
      
               await usuario.save();
               return true
        
    break;
   
    default:
        break;
   }
}




module.exports = {
    actualizarImagen
}