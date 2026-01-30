const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const pasteleriaDeSalSchema = Schema({
    ...MenuItemSchema,
})

module.exports = model("pasteleriaDeSal",pasteleriaDeSalSchema,"pasteleriaDeSal");
