const { Schema, model } = require('mongoose');

const catasDeCafeSchema = Schema({
    duracion:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    incluye:{
        type:String,
        required:true
    },
    souvenir:{
        type:String,
        required:true
    }
})

module.exports = model("catasDeCafe",catasDeCafeSchema,"catasDeCafe");
