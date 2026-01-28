const { Schema, model } = require('mongoose');

const pasteleriaDeSalSchema = Schema({
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

module.exports = model("pasteleriaDeSal",pasteleriaDeSalSchema,"pasteleriaDeSal");
