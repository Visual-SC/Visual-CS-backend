const { Schema, model } = require('mongoose');

const metodosDeFiltradoSchema = Schema({
    descripcion:{
        type:String,
        required:true
    },
    metodos:{
        type:[String],
        required:true
    },
    precios:{
        type:{
            "1taza": Number,
            "2tazas": Number,
            nota: String
        },
        required:true
    },
    adicionales:{
        type:{
            naturalesYHoneys: Number,
            sifon: Number
        },
        required:true
    }
})

module.exports = model("metodosDeFiltrado",metodosDeFiltradoSchema,"metodosDeFiltrado");
