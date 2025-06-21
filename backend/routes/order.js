import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addOrder, countOrders, deleteOrder, getOrder, getOrders, updateOrder, confirmOrder, refreshOrderPaymentStatus } from "../controllers/order.js";

// Create a router
const orderRouter = Router();

// Define routes
orderRouter.post("/orders", isAuthenticated, addOrder);

orderRouter.get("/orders", isAuthenticated, getOrders);

orderRouter.get("/orders/count", isAuthenticated, countOrders);

orderRouter.get("/orders/:id", isAuthenticated, getOrder);

// orderRouter.put("/orders/:id", updateOrder);

// orderRouter.delete("/orders/:id", deleteOrder);

orderRouter.post("/orders/:id/refresh-payment-status", isAuthenticated, refreshOrderPaymentStatus);

orderRouter.post("/orders/confirm", confirmOrder);

// Export router
export default orderRouter;