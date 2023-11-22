import { Router } from "express";
import { CartManager } from "../cartManager.js";

const cartsRouter = Router ();

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await CartManager.newCart()
        res.json(response)
    } catch (error) {
        res.send("Error al crear el carrito")
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const response = await CartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send("Error al enviar los productos del carrito")
    }
})

cartsRouter.post('/:cid/products/pid', async (req, res) => {
    const {cid, pid} = req.params;
    try {
        await CartManager.addProductToCart(cid, pid)
        res.send("Producto agregado")
    } catch (error) {
        res.send("Error al guardar producto en el carrito")
    }
})

export {cartsRouter}