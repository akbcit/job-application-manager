import express from "express";

import { parseGmailInbox,getAllEmails,getAllLinks,deleteAllEmails } from "../serverControllers/jobAlertsController.js";

export const jobAlertsRouter = express.Router();

jobAlertsRouter.get("/",getAllEmails);

jobAlertsRouter.get("/links",getAllLinks);

jobAlertsRouter.get("/gmail-parse/:emailFrom/:searchDate",parseGmailInbox);

jobAlertsRouter.delete("/", deleteAllEmails);

