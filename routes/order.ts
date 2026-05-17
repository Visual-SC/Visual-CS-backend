import { Router } from 'express';
import orderController from '../controller/order';

const OrderRouter = Router();


OrderRouter.post('/create-order', orderController.createOrder);
OrderRouter.get('/get-orders', orderController.getOrders);
OrderRouter.delete('/delete-orders', orderController.deleteOrders);


export default OrderRouter;