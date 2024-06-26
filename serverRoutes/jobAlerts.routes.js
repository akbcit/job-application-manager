import express from "express";

import { parseGmailInbox,getLinksForCandidate,deleteLinkById,deleteAllLinks} from "../serverControllers/jobAlertsController.js";
import { authenticate } from "../auth/middlewares/authenticate.middle.js";
import { candidateCheck } from "../auth/middlewares/candidateCheck.middle.js";

export const jobAlertsRouter = express.Router();

jobAlertsRouter.post("/gmailParse/:email/:emailFrom/:scanRange",authenticate,candidateCheck,parseGmailInbox);

jobAlertsRouter.get("/links/:email",authenticate,candidateCheck,getLinksForCandidate);

jobAlertsRouter.delete("/links/:email",authenticate,candidateCheck,deleteAllLinks);

jobAlertsRouter.delete("/links/:email/:linkId",authenticate,candidateCheck,deleteLinkById);






