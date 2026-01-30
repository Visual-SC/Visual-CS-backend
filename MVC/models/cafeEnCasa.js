const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const cafeEnCasaSchema = Schema({
    ...MenuItemSchema,
    nota:{
        type:String,
        required:true
    }
})

module.exports = model("cafeEnCasa",cafeEnCasaSchema,"cafeEnCasa");
