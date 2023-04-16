
const { Schema,model} = require('mongoose')



const HospitalShema = Schema({
    nombre:{
        type:String,
        required: true
    },
    img:{
        type: String
    },
    // creamos una foma de sabar que suario fue el 
    // que creo el hospital
    usuario:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
   
}, {collection:'hospitales'});


HospitalShema.method('toJSON', function(){
    const{__v,...object} = this.toObject();
    return object
})



module.exports = model('Hospital', HospitalShema)