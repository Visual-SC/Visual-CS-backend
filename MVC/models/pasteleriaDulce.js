const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const pasteleriaDulceSchema = Schema({
    ...MenuItemSchema
})

module.exports = model("pasteleriaDulce",pasteleriaDulceSchema,"pasteleriaDulce");
