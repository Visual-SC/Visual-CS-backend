//controladores
const controllerSweetPastries = require('../controllers/pasteleriaDulce')

const express = require('express');
const routerSweetPastries = express.Router();

routerSweetPastries.get("/pasteleriaDulce",controllerSweetPastries.getSweetPastries);

module.exports = routerSweetPastries;
