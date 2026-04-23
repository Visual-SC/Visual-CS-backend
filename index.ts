import express from "express";
import cors from "cors";
import { connection } from "./database/connection";
import ProductRouter from "./routes/product";
import { port } from "./utils/port";

connection.connect()

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
    }
    
    get(){
        this.app.get("/proof-route", (req, res) => {
            return res.send({
                "status":"functioning",
                "name":`servidor puerto ${this.port} funcionando correctamente`
            })
        })
    }

    listen() {        
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }
}

const server = new Server(express());

server.start();
server.get();
server.listen();    

server.app.use("/api", ProductRouter);

