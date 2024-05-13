import express from "express";
import { getUpdatedSummaryFromLLM,addToTracker,summarizeJD,getAllJobs,updateStatus } from "../serverControllers/jobController.js";

export const jobRouter = express.Router();

jobRouter.post("/update-summary",getUpdatedSummaryFromLLM);

jobRouter.post("/summarize-jd",summarizeJD);

jobRouter.post("/add-job",addToTracker);

jobRouter.get("/",getAllJobs);

jobRouter.put("/update/:jobId/:updatedStatus",updateStatus);