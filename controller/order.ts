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

    getDate = async (req: Request, res: Response) => {
        try {
            const type = req.params.type as string;

            if (type === 'last5') {
                const latestOrder = await OrdenCafe.findOne().sort({ fecha: -1 });

                if (!latestOrder) {
                    return res.status(404).send({
                        status: "error",
                        message: "No se encontraron órdenes ❌"
                    });
                }

                const endDate = new Date(latestOrder.fecha);
                endDate.setHours(23, 59, 59, 999);

                const startDate = new Date(endDate);
                startDate.setDate(startDate.getDate() - 4);
                startDate.setHours(0, 0, 0, 0);

                const orders = await OrdenCafe.find({
                    fecha: { $gte: startDate, $lte: endDate }
                }).sort({ fecha: -1 });

                return res.status(200).send({
                    status: "success",
                    message: "Órdenes de los últimos 5 días obtenidas correctamente ☕🛒",
                    data: {
                        startDate,
                        endDate,
                        totalOrders: orders.length,
                        orders
                    }
                });
            } else if (type === 'monthly') {
                const now = new Date();
                const year = parseInt(req.query.year as string) || now.getFullYear();
                const month = parseInt(req.query.month as string) || (now.getMonth() + 1);

                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0, 23, 59, 59, 999);

                const orders = await OrdenCafe.find({
                    fecha: { $gte: startDate, $lte: endDate }
                }).sort({ fecha: -1 });

                return res.status(200).send({
                    status: "success",
                    message: `Órdenes del mes ${month}/${year} obtenidas correctamente ☕`,
                    data: {
                        year,
                        month,
                        totalOrders: orders.length,
                        orders
                    }
                });
            } else {
                return res.status(400).send({
                    status: "error",
                    message: "Tipo no válido. Usa 'last5' o 'monthly' ❌"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener las órdenes por fecha ❌",
                error: error
            });
        }
    }

    getRevenue = async (req: Request, res: Response) => {
        try {
            const type = req.params.type as string;

            if (!['daily', 'monthly'].includes(type)) {
                return res.status(400).send({
                    status: "error",
                    message: "Tipo no válido. Usa 'daily' o 'monthly' ❌"
                });
            }

            const now = new Date();
            let startDate: Date;
            let groupBy: object;
            let dateFormat: string;

            if (type === 'daily') {
                startDate = new Date(now);
                startDate.setDate(startDate.getDate() - 30);
                startDate.setHours(0, 0, 0, 0);
                groupBy = {
                    year: { $year: "$fecha" },
                    month: { $month: "$fecha" },
                    day: { $dayOfMonth: "$fecha" }
                };
                dateFormat = "%Y-%m-%d";
            } else {
                startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
                groupBy = {
                    year: { $year: "$fecha" },
                    month: { $month: "$fecha" }
                };
                dateFormat = "%Y-%m";
            }

            const result = await OrdenCafe.aggregate([
                { $match: { fecha: { $gte: startDate }, estado: { $ne: 'cancelada' } } },
                {
                    $group: {
                        _id: groupBy,
                        total: { $sum: "$resumen.total" },
                        orders: { $sum: 1 },
                        date: { $first: { $dateToString: { format: dateFormat, date: "$fecha" } } }
                    }
                },
                { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
            ]);

            const data = result.map(item => ({
                date: item.date,
                total: item.total,
                orders: item.orders
            }));

            return res.status(200).send({
                status: "success",
                message: `Ingresos ${type === 'daily' ? 'diarios' : 'mensuales'} obtenidos correctamente ☕`,
                data: {
                    type,
                    chartData: data
                }
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener los ingresos ❌",
                error: error
            });
        }
    }

    
    
}

export default new OrderController();