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
        const category = req.params.category;
        const itemsPerPage = 9;

        const pageParam = req.params.page;
        const rawPage = Array.isArray(pageParam) ? (pageParam[0] ?? "1") : (pageParam ?? "1");
        const parsedPage = Number.parseInt(rawPage, 10);
        const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

        try {
            const totalCount = await Product.countDocuments({ categoria: category });
            const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 0;

            const products = await Product.find({ categoria: category })
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage);

            if (products && products.length > 0) {
                return res.status(200).send({
                    status: "success",
                    message: "Productos obtenidos correctamente ☕🍽️",
                    data: products,
                    totalPages,
                    currentPage: page,
                });
            }

            return res.status(404).send({
                status: "error",
                message: "No se encontraron productos ❌",
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al obtener los productos",
                error,
            });
        }
    }

    async getOneProduct(req: Request, res: Response) {
         let id = req.params.id;
 
         try {
           if(id){
            await Product.findById(id)
            .exec()
            .then((product)=>{
                return res.status(200).send({
                status: "success",
                message: "Producto obtenido correctamente ☕🍽️",
                product: product
                //id: product?._id   
                })    
            })    
            }
            else {
                return res.status(404).send({
                    status: "error",
                    message: "No se encontró el producto ❌"
                });
            }     
         } catch (error) {
             return res.status(500).send({
                status: "error",
                message: "Error al obtener los productos ❌",
                error: error
            });
         } 
    }
}

const productController = new ProductController(express.request, express.response);    

export default productController;