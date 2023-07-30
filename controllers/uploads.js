
const path = require('path')
const { response } = require('express');

const fs = require('fs')

const { v4: uuidv4 } = require('uuid'); // con esta libreria le damos un id unico a cada imagen
const { actualizarImagen } = require('../helpers/actualizar-imagen');



//funcion para subir archivos 
const fileUploads = (req, res= response) => {

    const tipo = req.params.tipo
    const id= req.params.id

    //validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' No es un medico, usuario u hospital (tipo)'
        })
    }

    //validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        });
      }

      //procesar la imagen

      //extraemos la imagen
      const file = req.files.imagen;

      //generar la extension del archivo

      const nombreCortado = file.name.split('.');

      //extencion
      const extensionArchivo = nombreCortado[nombreCortado.length-1];

      //validar extencion = solo ciertas extenciones voy a permitir

      const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

      if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        });
      }

      //generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
      


      // crear la ruta donde voy a guardar la imagen path

      const path = `./uploads/${tipo}/${nombreArchivo}`

        //   mover la imagen
    // Use the mv() method to place the file somewhere on your server
        file.mv(path, (err)=> {
            if (err){

                return res.status(500).json({
                    ok:false,
                    msg:'no se pudo subir la imagen'
                })
            }

            //Actualizar la base de datos

            actualizarImagen(tipo,id, nombreArchivo);

            res.json({
                ok:true,
                msg:'archivo subido',
                nombreArchivo
            })
        });
     

 

}

const mostrarIMagen = (req , res = response) => {
    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    //imagen por defecto si no hay una imagen
    if (fs.existsSync(pathImg)) {
        
        res.sendFile(pathImg)
        
    } else {
        const pathImg = path.join(__dirname,`../uploads/no-img.png`);
        res.sendFile(pathImg)
    }

}

module.exports = {
    fileUploads,
    mostrarIMagen
}