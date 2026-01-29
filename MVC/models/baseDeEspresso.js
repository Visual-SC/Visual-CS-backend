const { Schema, model } = require('mongoose');
const { MenuItem } = require('./MenuItem');

const baseDeEspressoSchema = MenuItem.discriminator('baseDelEspresso',new Schema({}));

module.exports = model("baseDeEspresso",baseDeEspressoSchema,"baseDeEspresso");
