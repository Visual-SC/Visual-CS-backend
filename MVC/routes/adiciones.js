const controllerAdiciones = require('../controllers/adiciones')

const express = require('express');
const routerAdiciones = express.Router();

routerAdiciones.get("/adiciones-prueba",controllerAdiciones.test);
routerAdiciones.get("/adiciones",controllerAdiciones.getAdiciones);

module.exports = routerAdiciones;