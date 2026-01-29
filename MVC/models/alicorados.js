const { Schema, model } = require('mongoose');
const { MenuItem } = require('./MenuItem');

const alicoradosSchema = MenuItem.discriminator('alicorados',new Schema({}));

module.exports = model("alicorados",alicoradosSchema,"alicorados");
