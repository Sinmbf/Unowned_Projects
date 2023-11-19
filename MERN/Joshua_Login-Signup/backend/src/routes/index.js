import { Router } from "express";
import userRouter from "./userRoutes.js";

const router = Router();
// APP ROUTE 1: Related to the user : /api/user
router.use("/user", userRouter);

export default router;
