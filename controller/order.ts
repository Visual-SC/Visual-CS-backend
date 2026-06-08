import { Request, Response } from "express";
import { OrdenCafe } from "../model/order";
import { FormaShortDate } from "../utils/FormatShortDate";

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
        const sortOrder = req.query.order === "asc" ? 1 : -1;
        const orders = await OrdenCafe.find().sort({ fecha: sortOrder });
        
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

    getLastDays = async (req: Request, res: Response) =>{
        
    }



    getDate = async (req: Request, res: Response) => {
        try {
            const type = req.params.type as string;

            if (type === 'last5') {
                const distinctDates = await OrdenCafe.aggregate([
                    {
                        $group: {
                            _id: {
                                $dateToString: { format: "%Y-%m-%d", date: "$fecha" }
                            }
                        }
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 5 }
                ]);

                if (distinctDates.length === 0) {
                    return res.status(200).send({
                        status: "success",
                        message: "No hay órdenes registradas ☕",
                        data: {
                            dailyOrders: [],
                            totalOrders: 0
                        }
                    });
                }

                const dailyOrders: { date: string; orders: any[]; count: number }[] = [];

                for (const item of distinctDates) {
                    const dateStr = item._id;
                    const [year, month, day] = dateStr.split('-').map(Number);
                    const dayStart = new Date(year, month - 1, day, 0, 0, 0, 0);
                    const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999);

                    const dayOrders = await OrdenCafe.find({
                        fecha: { $gte: dayStart, $lte: dayEnd }
                    }).sort({ fecha: -1 });

                    dailyOrders.push({
                        date: dateStr,
                        orders: dayOrders.map(order => ({
                            ...order.toObject(),
                            fecha: order.fecha
                        })),
                        count: dayOrders.length
                    });
                }

                const totalOrders = dailyOrders.reduce((sum, d) => sum + d.count, 0);

                // filtro por query date: /api/order-date/last5?date=2026-06-05
                const filterDate = req.query.date as string;
                if (filterDate) {
                    const matched = dailyOrders.find(d => d.date === filterDate);
                    if (!matched) {
                        return res.status(200).send({
                            status: "success",
                            message: `No hay órdenes para la fecha ${filterDate} ☕`,
                            data: {
                                days: dailyOrders.map(d => d.date),
                                dailyOrders: [],
                                totalOrders: 0
                            }
                        });
                    }
                    return res.status(200).send({
                        status: "success",
                        message: `Órdenes del día ${filterDate} obtenidas correctamente ☕`,
                        data: {
                            days: dailyOrders.map(d => d.date),
                            dailyOrders: [matched],
                            totalOrders: matched.count
                        }
                    });
                }

                return res.status(200).send({
                    status: "success",
                    message: "Órdenes de los últimos 5 días obtenidas correctamente ☕",
                    data: {
                        startDate: dailyOrders[dailyOrders.length - 1]?.date || '',
                        endDate: dailyOrders[0]?.date || '',
                        days: dailyOrders.map(d => d.date),
                        totalOrders,
                        dailyOrders
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
                        startDate: FormaShortDate.format(startDate),
                        endDate: FormaShortDate.format(endDate),
                        totalOrders: orders.length,
                        orders: orders.map(order => ({
                            ...order.toObject(),
                            fecha: order.fecha
                        }))
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