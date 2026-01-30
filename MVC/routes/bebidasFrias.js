//controladores
const controllerColdDrinks = require('../controllers/bebidasFrias')

const express = require('express');
const routerColdDrinks = express.Router();

routerColdDrinks.get("/bebidasFrias",controllerColdDrinks.getColdDrinks);

module.exports = routerColdDrinks;
