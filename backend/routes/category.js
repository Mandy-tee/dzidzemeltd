import { Router } from "express";
import { addCategory, countCategories, deleteCategory, getCategory, getCategories, updateCategory } from "../controllers/category.js";

// Create a router
const categoryRouter = Router();

// Define routes
categoryRouter.post("/categories", addCategory);

categoryRouter.get("/categories", getCategories);

categoryRouter.get("/categories/count", countCategories);

categoryRouter.get("/categories/:id", getCategory);

categoryRouter.put("/categories/:id", updateCategory);

categoryRouter.delete("/categories/:id", deleteCategory);

// Export router
export default categoryRouter;