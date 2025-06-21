import { Router } from "express";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { addUser, getProfile, getUser, getUsers, loginUser, registerUser, updateUser } from "../controllers/user.js";

// Create a router
const userRouter = Router();

// Define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, hasPermission("get_profile"), getProfile);

userRouter.post("/users", isAuthenticated, hasPermission('post_user'), addUser);

userRouter.get("/users", isAuthenticated, hasPermission('get_users'), getUsers);

userRouter.get("/users/:id", isAuthenticated, hasPermission('get_user'), getUser);

userRouter.put("/users/:id", isAuthenticated, hasPermission('put_user'), updateUser);

// Export router
export default userRouter;

