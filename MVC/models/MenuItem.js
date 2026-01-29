const { Schema, model } = require('mongoose');

//1. Crear el modelo base
const baseMenu = {
    discrimatorKey:"categoria",
    collection:"menuItems"
}

const menuItemSchema = new Schema({
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
},baseMenu)  

//modelo base
const MenuItem = model("MenuItem",menuItemSchema);

module.exports = {
    MenuItem
}



