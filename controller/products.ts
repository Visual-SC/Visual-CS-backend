import { Request, Response } from "express";
import express from "express";
import { productsList } from "../utils/productsLists";
import { Product } from "../model/product";


class ProductController {
    req: Request = express.request;
    res: Response = express.response;
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    async proof(req: Request, res: Response){
        return res.status(200).send({
        status:"success",
        message: "está funcionando la ruta de articulo"
        })
    }

    async createProducts(req: Request, res: Response) { 
        const result = await Product.insertMany(productsList);
        try {
            if(result && result.length > 0){
                return res.status(201).send({
                    status: "success",
                    message: "Los productos se han creado correctamente",
                    data: result
                });
            }else{
                return res.status(400).send({
                    status: "error",
                    message: "No se pudieron crear los productos"
                });
            }
            
        } catch (error: any) {
            // 4. Si no, retornar mensaje de error
            return res.status(500).send({
                status: "error",
                message: "Error al crear los productos",
                error: error?.message || error
            });
        }
    }
}

const productController = new ProductController(express.request, express.response);    

export default productController;