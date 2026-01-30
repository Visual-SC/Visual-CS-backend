//controladores
const controllerCoffeeAtHome = require('../controllers/cafeEnCasa')

const express = require('express');
const routerCoffeeAtHome = express.Router();

routerCoffeeAtHome.get("/cafeEnCasa",controllerCoffeeAtHome.getCoffeeAtHome);

module.exports = routerCoffeeAtHome;
