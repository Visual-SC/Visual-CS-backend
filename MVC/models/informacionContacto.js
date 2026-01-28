const { Schema, model } = require('mongoose');

const informacionContactoSchema = Schema({
    instagram:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    horario:{
        type:String,
        required:true
    }
})

module.exports = model("informacionContacto",informacionContactoSchema,"informacionContacto");
