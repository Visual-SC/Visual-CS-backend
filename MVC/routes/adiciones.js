//controladores
const controllerAdditions = require('../controllers/adiciones')

const express = require('express');
const routerAddtions = express.Router();

routerAddtions.get("/adiciones",controllerAdditions.getAdditions);

module.exports = routerAddtions;