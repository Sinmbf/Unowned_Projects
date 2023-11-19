import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
config();
const app = express();

// Middleware to parse request body
app.use(express.json());

// Middleware to fix cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to show logs for response and status code
app.use(morgan("dev"));

// Middleware to send cookie from frontend to backend
app.use(cookieParser(process.env.COOKIE_SECRET));

// Main Route
app.use("/api", appRouter);

export default app;
