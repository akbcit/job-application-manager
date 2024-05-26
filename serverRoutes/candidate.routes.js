import { authenticate } from "../auth/middlewares/authenticate.middle.js";
import { candidateCheck } from "../auth/middlewares/candidateCheck.middle.js";
import { getProfileSummary,startJobSearch,addJobQuery,endJobSearch,deleteJobQuery,getJobQueriesForCandidate } from "../serverControllers/candidateController.js";
import express from "express";

export const candidateRouter = express.Router();

candidateRouter.get("/profile/:email", authenticate, getProfileSummary);

candidateRouter.post("/jobSearch/start/:email", authenticate, candidateCheck,startJobSearch);

candidateRouter.post("/jobSearch/end/:email", authenticate, candidateCheck,endJobSearch);

candidateRouter.get("/jobSearch/query/:email", authenticate, candidateCheck,getJobQueriesForCandidate);

candidateRouter.post("/jobSearch/query/:email", authenticate, candidateCheck,addJobQuery);

candidateRouter.delete("/jobSearch/query/:email/:queryId", authenticate, candidateCheck,deleteJobQuery);



