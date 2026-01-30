//controladores
const controllerHotDrinksWithoutCoffee = require('../controllers/bebidasCalientesSinCafe')

const express = require('express');
const routerHotDrinksWithoutCoffee = express.Router();

routerHotDrinksWithoutCoffee.get("/bebidasCalientesSinCafe",controllerHotDrinksWithoutCoffee.getHotDrinksWithoutCoffee);

module.exports = routerHotDrinksWithoutCoffee;
