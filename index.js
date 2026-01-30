// Dependencias
const express = require('express');
const cors = require('cors');
const { connection } = require("./database/connection");

// Configuración de la aplicación
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
connection();

// Rutas del menú
const routes = {
    addtions: require('./MVC/routes/adiciones'),
    spiritedDrinks: require('./MVC/routes/alicorados'),
    espressoBased: require('./MVC/routes/baseDeEspresso'),
    hotDrinksWithoutCoffee: require('./MVC/routes/bebidasCalientesSinCafe'),
    coldDrinks: require('./MVC/routes/bebidasFrias'),
    coffeeAtHome: require('./MVC/routes/cafeEnCasa'),
    savoryPastries: require('./MVC/routes/pasteleriaDeSal'),
    sweetPastries: require('./MVC/routes/pasteleriaDulce')
};

// Ruta de prueba
app.get("/probando", (req, res) => {
    console.log("ruta de prueba");
    return res.status(200).json({
        status: "success",
        message: "Servidor de prueba"
    });
});

// Registrar todas las rutas del menú
Object.values(routes).forEach(route => {
    app.use("/api/menu:itemId", route);
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada"
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port} 🛢️`);
});

module.exports = app;
