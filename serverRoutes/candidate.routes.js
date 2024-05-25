import { authenticate } from "../auth/middlewares/authenticate.middle.js";
import { getProfileSummary } from "../serverControllers/candidateController.js";
import express from "express";

export const candidateRouter = express.Router();

candidateRouter.get("/profile/:email", authenticate, getProfileSummary);
