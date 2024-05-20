import { authenticate } from "../auth/middlewares/authenticate.middle.js";
import { getProfileSummary } from "../serverControllers/profile.controller.js";
import express from "express";

export const profileRouter = express.Router();

profileRouter.get("/:email", authenticate, getProfileSummary);
