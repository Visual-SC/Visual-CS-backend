const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const baseDeEspressoSchema = Schema({
    ...MenuItemSchema
})

module.exports = model("baseDeEspresso",baseDeEspressoSchema,"baseDeEspresso");
