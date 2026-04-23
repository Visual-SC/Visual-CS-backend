import  { Router } from 'express';
import productController from '../controller/products';

const ProductRouter = Router();

ProductRouter.get('/proof-product', productController.proof)
ProductRouter.post('/create-products', productController.createProducts)

export default ProductRouter;