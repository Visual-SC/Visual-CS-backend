const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const bebidasFriasSchema = Schema({
    ...MenuItemSchema
})

module.exports = model("bebidasFrias",bebidasFriasSchema,"bebidasFrias");
