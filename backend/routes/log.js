import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getHubtelLog, getHubtelLogs } from "../controllers/log.js";

// Create a router
const logRouter = Router();

// Define routes
logRouter.get("/hubtel-logs", isAuthenticated, getHubtelLogs);

logRouter.get("/hubtel-logs/:id", isAuthenticated, getHubtelLog);

// Export router
export default logRouter;