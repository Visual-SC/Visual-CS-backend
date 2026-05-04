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
    
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al crear los productos",
                error: error
            });
        }
    }

    async getProducts(req: Request, res: Response) {
       const products = await Product.find();
       try {
        if(products && products.length > 0){
            return res.status(200).send({
                status: "success",
                message: "Productos obtenidos correctamente ☕🍽️",
                data: products
            });
        } else {
            return res.status(404).send({
                status: "error",
                message: "No se encontraron productos ❌"
            });
        }
       } catch (error) {
              return res.status(500).send({
                status: "error",
                message: "Error al obtener los productos",
                error: error
            });
       } 
    }
    
    async getProductsByCategory(req: Request, res: Response) {
        let category = req.params.category;

        let page:number = 1;

        const itemsPerPage = 9;

        if(req.params.page){
            page = req.params.page as unknown as number;
        }

        let totalCounter: number = 0;

        await Product.where({categoria: category})
        .countDocuments()
        .then((total)=>{
            totalCounter = total;
            totalCounter = Math.ceil(totalCounter/itemsPerPage);
            return totalCounter;
        })


        await Product
        .find({ categoria: category })
        .populate('categoria')
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .then((products)=>{
            if(products && products.length > 0){
                return res.status(200).send({
                    status: "success",
                    message: "Productos obtenidos correctamente ☕🍽️",
                    data: products,
                    totalPages: totalCounter,
                    currentPage: page
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron productos ❌"
                });
            }   
        })
    }
}

const productController = new ProductController(express.request, express.response);    

export default productController;