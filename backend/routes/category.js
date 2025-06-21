import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { addCategory, countCategories, deleteCategory, getCategory, getCategories, updateCategory } from "../controllers/category.js";

// Create a router
const categoryRouter = Router();

// Define routes
categoryRouter.post("/categories", isAuthenticated, hasPermission('post_category'), addCategory);

categoryRouter.get("/categories", getCategories);

categoryRouter.get("/categories/count", countCategories);

categoryRouter.get("/categories/:id", getCategory);

categoryRouter.put("/categories/:id", isAuthenticated, hasPermission('put_category'), updateCategory);

// categoryRouter.delete("/categories/:id", isAuthenticated, hasPermission('delete_category'), deleteCategory);

// Export router
export default categoryRouter;