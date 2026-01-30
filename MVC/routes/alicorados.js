//controladores
const controllerSpiritedDrinks = require('../controllers/alicorados')

const express = require('express');
const routerSpiritedDrinks = express.Router();

routerSpiritedDrinks.get("/alicorados",controllerSpiritedDrinks.getSpiritedDrinks);

module.exports = routerSpiritedDrinks;
