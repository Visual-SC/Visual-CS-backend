//controladores
const controllerEspressoBased = require('../controllers/baseDeEspresso')

const express = require('express');
const routerEspressoBased = express.Router();

routerEspressoBased.get("/baseDeEspresso",controllerEspressoBased.getEspressoBased);

module.exports = routerEspressoBased;
