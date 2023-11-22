import express from "express";
import { ProductManager } from './productManager.js'
import { CartManager } from "./cartManager.js";
import  { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";


const app = express();
const PORT = 5000; 

export  const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)


app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`))