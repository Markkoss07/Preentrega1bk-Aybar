import { Router } from 'express';
import { productManager } from '../server.js';

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if(limit){
            res.json(productos.slice(0, parseInt(limit)));
        } else {
            res.json(productos);
        } 
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

productsRouter.get("/:pid", async (req, res) => {
    const {pid} = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        res.send(`Error al obtener productos con Id ${pid}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const {
            title, 
            descripcion, 
            thumbanail, 
            price, 
            code, 
            stock, 
            status, 
            category} = req.body;
        const response = await productManager.addProduct({
            title, 
            descripcion,
            thumbanail,
            price,
            code, 
            stock,
            status,
            category
        })
        res.json(response)
    } catch (error) {
        res.send(`Error al agregar producto`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const pid = req.params.pid

    try {
        const {
            title, 
            descripcion,
            price,
            thumbanail,
            code, 
            stock,
            status,
            category
            } = req.body;
            const response = await productManager.updateProduct(id, {
                title, 
                descripcion,
                price,
                thumbanail,
                code, 
                stock,
                status,
                category
            })
            res.json(response)
    } catch (error) {
        res.send(`Error al modificar producto con Id ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) =>{
    const pid = req.params.pid;
    try {
        await productManager.deleteProduct(id)
        res.send("Producto eliminado")
    } catch (error) {
        res.send(`Error al eliminar producto con Id ${pid}`)
    }
})

export {productsRouter}