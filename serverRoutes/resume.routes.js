import express from "express";
import { getResume,getResumesForCandidate } from "../serverControllers/resumeController.js";


export const resumeRouter = express.Router();

resumeRouter.get("/pdf",getResume);

resumeRouter.get("/version-names/:email",getResumesForCandidate);

