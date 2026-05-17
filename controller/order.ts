import { Request, Response } from "express";
import { OrdenCafe } from "../model/order";

class OrderController {
    createOrder = async (req: Request, res: Response) => {
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

    getOrders = async (req: Request, res: Response) => {
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
    
    deleteOrders = async (req: Request, res: Response) => {
        try {
            const result = await OrdenCafe.deleteMany({});

            if(result.deletedCount && result.deletedCount > 0) {
                return res.status(200).send({
                    status: "success",
                    message: `Se eliminaron ${result.deletedCount} órdenes correctamente ☕🛒`,
                    data: { deletedCount: result.deletedCount }
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No hay órdenes para eliminar ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al eliminar las órdenes ❌",
                error: error
            });
        }
    }
}

export default new OrderController();