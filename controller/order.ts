import { Request, Response } from "express";
import express from "express";
import { OrdenCafe } from "../model/order";

class OrderController {
    req: Request = express.request;
    res: Response = express.response;
    constructor(req: Request, res: Response) {
            this.req = req;
            this.res = res;
    }
     
    async proof(req: Request, res: Response){
        return res.status(200).send({
        status:"success",
        message: "está funcionando la ruta de orden"
        })
    }

    async createOrder(req: Request, res: Response) {
        let params: OrdenCafe = req.body;

        //aqui va a venir validación, que se va a revisar en otro sprint

        const Order = new OrdenCafe<OrdenCafe>(params);

        try {
            await Order.save().then((orderData) => { 
                if(orderData){
                    return res.status(201).send({
                    status: "success",
                    message: "La orden se ha creado correctamente ☕🛒",
                    data: orderData
                    })
                }
                
                return res.status(400).send({
                    status: "error",
                    message: "Lo siento, no pudimos crear la orden ❌"
                });
            });    
        } catch (error) {
             return res.status(500).send({
                status: "error",
                message: "Error al crear la orden ❌",
                error: error  
            });
        }
    }

    async getOrders(req: Request, res: Response) {
        const orders = await OrdenCafe.find();
        
        try {
            if(orders && orders.length > 0){
                return res.status(200).send({
                    status: "success",
                    message: "Órdenes obtenidas correctamente ☕🛒",
                    data: orders
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron órdenes ❌"
                });
            }
        } catch (error) {
             return res.status(500).send({
                status: "error",
                message: "Error al obtener las órdenes ❌",
                error: error
            });
        }

    }        
}

const orderController = new OrderController(express.request, express.response);

export default orderController;