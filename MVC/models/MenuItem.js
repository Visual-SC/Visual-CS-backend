const { Schema, model } = require('mongoose');

const MenuItemSchema = new Schema({
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
    }
});

module.exports = model("MenuItemSchema",MenuItemSchema,"MenuItemSchema")