import express from "express";
import { getUpdatedSummaryFromLLM } from "../serverControllers/resumeController.js";

export const receiverRouter = express.Router();

receiverRouter.post("/update-summary",getUpdatedSummaryFromLLM);