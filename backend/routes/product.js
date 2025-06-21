import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { addProduct, countProducts, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.js";

// Create a router
const productRouter = Router();

// Define routes
productRouter.post("/products", isAuthenticated, hasPermission('post_product'), addProduct);

productRouter.get("/products", getProducts);

productRouter.get("/products/count", countProducts);

productRouter.get("/products/:id", getProduct);

productRouter.put("/products/:id", isAuthenticated, hasPermission('put_product'), updateProduct);

// productRouter.delete("/products/:id", isAuthenticated, hasPermission('delete_product'), deleteProduct);

// Export router
export default productRouter;