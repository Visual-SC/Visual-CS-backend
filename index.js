/*conexion a la base de datos*/
const { connection } = require("./database/connection");

connection();

/*instalación del servidor*/
const express = require('express');


const app = express();

const cors = require('cors');

app.use(cors());

/*creación del servidor */
const port = 3000;

app.listen(port,()=>{
    console.log(`Servidor corriendo en puerto ${port} 🛢️`)
})

/*crear una ruta de prueba*/
app.get("/probando",(req,res)=>{
    console.log("ruta de prueba")

    return res.status(200).json({
        status:"success",
        message:"Servidor de pruea"
    })
})


//rutas por colecciones: adiciones
const adicionesRoute = require('./MVC/routes/adiciones');

//controlador general de rutas
app.use("/api",adicionesRoute);

