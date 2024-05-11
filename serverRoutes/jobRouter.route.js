import express from "express";
import { getUpdatedSummaryFromLLM,addToTracker } from "../serverControllers/jobController.js";

export const jobRouter = express.Router();

jobRouter.post("/update-summary",getUpdatedSummaryFromLLM);

jobRouter.post("/add-job",addToTracker);