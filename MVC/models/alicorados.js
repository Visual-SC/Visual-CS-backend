const { Schema, model } = require('mongoose');
const { MenuItemSchema } = require('./MenuItem');

const LacedLiquorSchema = Schema({
    ...MenuItemSchema,
})

module.exports = model("alicorados",LacedLiquorSchema,"alicorados");
