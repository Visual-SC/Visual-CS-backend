import { Request, Response } from "express";
import express from "express";

class ProductController {
    req: Request = express.request;
    res: Response = express.response;
    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    proof(req: Request, res: Response){
        return res.status(200).send({
        status:"success",
        message: "está funcionando la ruta de articulo"
        })
    }
}

const productController = new ProductController(express.request, express.response);    

export default productController;