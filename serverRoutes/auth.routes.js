import express from "express";
import { googleSignIn,logout } from "../serverControllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/google",googleSignIn);

authRouter.post("/logout",logout);
