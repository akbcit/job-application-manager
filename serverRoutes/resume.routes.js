import express from "express";
import { getResume } from "../serverControllers/resumeController.js";


export const resumeRouter = express.Router();

resumeRouter.get("/pdf",getResume);

resumeRouter.patch("/update-resume")

