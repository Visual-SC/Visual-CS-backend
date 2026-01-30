const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const bebidasCalientesSinCafeSchema = Schema({
    ...MenuItemSchema
})

module.exports = model("bebidasCalientesSinCafe",bebidasCalientesSinCafeSchema,"bebidasCalientesSinCafe");
