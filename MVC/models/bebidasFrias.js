const { Schema, model } = require('mongoose');

const bebidasFriasSchema = Schema({
    descripcion:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true    
    },
})

module.exports = model("bebidasFrias",bebidasFriasSchema,"bebidasFrias");
