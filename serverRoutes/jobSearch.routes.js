import express from "express";
import { jSearchQuery } from "../serverControllers/externalJobSearch.js";

export const jobSearchRouter = express.Router();

jobSearchRouter.get("/jSearchApi",jSearchQuery);
