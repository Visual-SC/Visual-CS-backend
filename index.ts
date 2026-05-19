import express from "express";
import cors from "cors";
import { connection } from "./database/connection";
import ProductRouter from "./routes/product";
import OrderRouter from "./routes/order";
import EventRouter from "./routes/event";
import { port } from "./utils/port";

//clase para configurar el servidor
export class Server {
    app: express.Application;
    private port: number = port;

    constructor(app: express.Application) {
        this.app = app;
    }

    start() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    
    listen() {        
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

const server = new Server(express());

server.start();
server.listen();

server.app.use(cors());
server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

//Uso de la conexión del servidor con los productos ☕
server.app.use("/api", ProductRouter);

//Uso de la conexión del servidor con la orden 🛒
server.app.use("/api", OrderRouter);

//Uso de la conexión del servidor con los eventos 🎉
server.app.use("/api", EventRouter);

// Conectar a MongoDB
connection.connect().catch((error) => {
    console.error("Fallo la conexión inicial a la base de datos:", error);
});

