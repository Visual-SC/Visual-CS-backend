const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const adicionesSchema = Schema({
  ...MenuItemSchema
})     

module.exports =  model("adiciones",adicionesSchema,"adiciones");
