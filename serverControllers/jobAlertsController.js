import dotenv from "dotenv";
dotenv.config();
import {fetchEmailsFromSender} from "../services/google/gmail/fetchEmailsFromSender.js"

export const parseGmailInbox = async (req, res) => {
  const senderEmail = req.params.emailFrom;
  const scanRange = req.params.scanRange;

  const allowedScanRanges = ["today","last-three-days","last-week"];

  console.log(scanRange);

  if (!senderEmail) {
    return res.status(400).send({ error: "Sender email is required" });
  }

  if (!allowedScanRanges.includes(scanRange)) {
    return res.status(400).send({ error: "Invalid scan range" });
  }

  if (!req.session.user || !req.session.user.accessToken) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const accessToken = req.session.user.accessToken;
  try {
    const emails = await fetchEmailsFromSender(accessToken, senderEmail, scanRange);
    console.log(`emails:`,emails);
    return res.status(200).send(emails);
  } catch (error) {
    return res.status(500).send({ error: "Failed to fetch emails" });
  }
};
