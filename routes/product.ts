import  { Router } from 'express';
import productController from '../controller/products';

const ProductRouter = Router();

ProductRouter.post('/create-products', productController.createProducts)
ProductRouter.get('/get-products', productController.getProducts)
ProductRouter.get('/get-products/:category/:page', productController.getProductsByCategory)
ProductRouter.get('/get-product/:id', productController.getOneProduct)

export default ProductRouter;