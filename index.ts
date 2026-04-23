import express from "express";
import cors from "cors";
import { connection } from "./database/connection";

connection.connect()

class Server {
    private app: express.Application;
    private _port: number = 3001;

    constructor(port: number = 3001) {
        this.app = express();
        this._port = port;
    }

    start() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    
    get(){
        this.app.get("/proof-route", (req, res) => {
            return res.send({
                "status":"functioning",
                "name":"servidor puerto 3001 funcionando correctamente"
            })
        })
    }

    listen() {        
        this.app.listen(this._port, () => {
            console.log(`Servidor corriendo en ${this._port}`);
        });
    }
}

const server = new Server();

server.start();
server.get();
server.listen();    
