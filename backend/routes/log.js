import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { getHubtelLogs } from "../controllers/log.js";

// Create a router
const logRouter = Router();

// Define routes
logRouter.get("/hubtel-logs", isAuthenticated, getHubtelLogs);

// Export router
export default logRouter;