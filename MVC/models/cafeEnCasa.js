const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const cafeEnCasaSchema = Schema({
    ...MenuItemSchema,
    nota:{
        type:String,
        required:true
    }
})

//lo dejamos tal cual como está es muy difrerente

module.exports = model("cafeEnCasa",cafeEnCasaSchema,"cafeEnCasa");
