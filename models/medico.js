
const { Schema,model} = require('mongoose')



const MedicoShema = Schema({
    nombre:{
        type:String,
        required: true
    },
    img:{
        type: String
    },
    // creamos una forma de sabar que suario fue el 
    // que creo el hospital
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    },
   
});


MedicoShema.method('toJSON', function(){
    const{__v,...object} = this.toObject();
    return object
})



module.exports = model('Medico', MedicoShema)