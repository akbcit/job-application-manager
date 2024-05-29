import express from "express";

import { parseGmailInbox} from "../serverControllers/jobAlertsController.js";
import { authenticate } from "../auth/middlewares/authenticate.middle.js";

export const jobAlertsRouter = express.Router();

jobAlertsRouter.get("/gmailParse/:emailFrom/:scanRange",authenticate,parseGmailInbox);




