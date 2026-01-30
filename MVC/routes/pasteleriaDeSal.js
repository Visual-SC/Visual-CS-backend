//controladores
const controllerSavoryPastries = require('../controllers/pasteleriaDeSal')

const express = require('express');
const routerSavoryPastries = express.Router();

routerSavoryPastries.get("/pasteleriaDeSal",controllerSavoryPastries.getSavoryPastries);

module.exports = routerSavoryPastries;
