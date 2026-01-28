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

module.exports = model("cafeEnCasa",cafeEnCasaSchema,"cafeEnCasa");
