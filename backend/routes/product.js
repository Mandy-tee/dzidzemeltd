import { Router } from "express";
import { addProduct, countProducts, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.js";

// Create a router
const productRouter = Router();

// Define routes
productRouter.post("/products", addProduct);

productRouter.get("/products", getProducts);

productRouter.get("/products/count", countProducts);

productRouter.get("/products/:id", getProduct);

productRouter.put("/products/:id", updateProduct);

productRouter.delete("/products/:id", deleteProduct);

// Export router
export default productRouter;