import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/userControllers.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/tokenManager.js";
const userRouter = Router();

// USER ROUTE 1: Register a user using POST : /api/user/signup
userRouter.post("/signup", validate(signupValidator), registerUser);

// USER ROUTE 2: Login a user using POST : /api/user/login
userRouter.post("/login", validate(loginValidator), loginUser);

// USER ROUTE 3: Check the auth-status of a user using get : /api/user/auth-status
userRouter.get("/auth-status", verifyToken, verifyUser);

// USER ROUTE 4: Logout user using get : /api/user/logout
userRouter.get("/logout", verifyToken, logoutUser);

export default userRouter;
