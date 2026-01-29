const { Schema, model } = require('mongoose');
const { MenuItem } = require('./MenuItem');

const bebidasCalientesSinCafeSchema = MenuItem.discriminator('adiciones',new Schema({}));

module.exports = model("bebidasCalientesSinCafe",bebidasCalientesSinCafeSchema,"bebidasCalientesSinCafe");
