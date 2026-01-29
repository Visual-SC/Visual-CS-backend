const { Schema, model } = require('mongoose');
const { MenuItem } = require('./MenuItem');

const bebidasFriasSchema = MenuItem.discriminator('bebidasFrias',new Schema({}));

module.exports = model("bebidasFrias",bebidasFriasSchema,"bebidasFrias");
