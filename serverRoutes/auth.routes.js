import express from "express";
import { googleSignIn,logout,refreshToken } from "../serverControllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/google",googleSignIn);

authRouter.post("/refresh-token",refreshToken);

authRouter.post("/logout",logout);
