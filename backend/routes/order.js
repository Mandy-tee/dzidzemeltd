import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addOrder, countOrders, deleteOrder, getOrder, getOrders, updateOrder, confirmOrder, refreshOrderPaymentStatus } from "../controllers/order.js";

// Create a router
const orderRouter = Router();

// Define routes
orderRouter.post("/orders", isAuthenticated, addOrder);

orderRouter.get("/orders", getOrders);

orderRouter.get("/orders/count", countOrders);

orderRouter.get("/orders/:id", getOrder);

// orderRouter.put("/orders/:id", updateOrder);

// orderRouter.delete("/orders/:id", deleteOrder);

orderRouter.post("/orders/:id/refresh-payment-status", refreshOrderPaymentStatus);

orderRouter.post("/orders/confirm", confirmOrder);

// Export router
export default orderRouter;