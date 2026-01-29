const { Schema, model } = require('mongoose');

const cafeEnCasaSchema = Schema({
    descripcion:{
        type:String,
        required:true
    },
    presentacion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true    
    },
    nota:{
        type:String,
        required:true
    }
})

//lo dejamos tal cual como está es muy difrerente

module.exports = model("cafeEnCasa",cafeEnCasaSchema,"cafeEnCasa");
