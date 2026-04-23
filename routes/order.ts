import { Router } from 'express';
import orderController from '../controller/order';

const OrderRouter = Router();

OrderRouter.get('/proof-order', orderController.proof);
OrderRouter.post('/create-order', orderController.createOrder);

export default OrderRouter;