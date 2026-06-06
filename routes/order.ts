import { Router } from 'express';
import orderController from '../controller/order';

const OrderRouter = Router();


OrderRouter.post('/create-order', orderController.createOrder);
OrderRouter.get('/get-orders', orderController.getOrders);
OrderRouter.delete('/delete-orders', orderController.deleteOrders);

/*Para hacer la solicitud de los ingresos 💵 usa
    order-revenue/daily
    order-revenue/monthly
*/
OrderRouter.get('/order-revenue/:type', orderController.getRevenue);

/*Para hacer la solicitud de las ordenes 🛒 usa
    order-date/last5: obtiene las ordenes por los ultimos 5 días
    order-date/monthly?year=2026&month=6
*/
OrderRouter.get('/order-date/:type', orderController.getDate);


export default OrderRouter;