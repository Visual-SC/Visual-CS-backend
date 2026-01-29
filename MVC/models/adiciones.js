const { Schema,model} = require('mongoose');
const { MenuItem } = require('./MenuItem');

const adicionesSchema =  MenuItem.discriminator('adiciones',new Schema({}));

module.exports = model("adiciones",adicionesSchema,"adiciones")