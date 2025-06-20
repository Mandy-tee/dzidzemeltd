import { Router } from "express";
import { getProfile, loginUser, registerUser } from "../controllers/user.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, hasPermission("get_profile"), getProfile);

// Export router
export default userRouter;

