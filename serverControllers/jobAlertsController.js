import dotenv from "dotenv";
import fetch from "node-fetch";
import { JobAlertEmailRepo } from "../data/db/jobAlertEmail.repo.js";
dotenv.config();

const jobAlertEmailRepo = new JobAlertEmailRepo();

const datasource = process.env.MONGODB_DATASOURCE_NAME;
const database = process.env.MONGODB_DATABASE_NAME;
const collection = process.env.MONGO_COLLECTION_NAME;
const apiKey = process.env.MONGO_API_KEY;
const mongoApiUrl = process.env.MONGO_API_URL;
const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

export const parseGmailInbox = async (req, res) => {
  const emailFrom = req.params.emailFrom;
  const searchDate = req.params.searchDate;
  const url = googleScriptUrl;

  const params = {
    emailFrom: emailFrom,
    collection: collection,
    database: database,
    dataSource: datasource,
    apiKey: apiKey,
    mongoApiUrl: mongoApiUrl,
    searchDate: searchDate,
  };

  console.log(params);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const responseData = await response.text();
  return res.send(responseData);
};

export const getAllEmails = async (req, res) => {
  try {
    const emails = await jobAlertEmailRepo.getAllEmails();
    if (emails) {
      return res.status(200).send({ emails: emails });
    } else {
      return res.status(500).send({ error: "No emails found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "No emails found" });
  }
};

export const deleteAllEmails = async (req, res) => {
  try {
    const result = await jobAlertEmailRepo.deleteAllEmails();
    return res
      .status(200)
      .send({ message: "All emails deleted successfully", result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error deleting emails" });
  }
};

export const getAllLinks = async (req, res) => {
  try {
    const emails = await jobAlertEmailRepo.getAllEmails();
    let links = [];
    if (emails) {
      emails.forEach((email) => {
        email.links.forEach((link) => {
          if (!link.includes("unsub")) {
            const linkObj = {
              source: email.sender,
              date: email.date,
              link: link,
            };
            links.push(linkObj);
          }
        });
      });
      return res.status(200).send({ links: links });
    } else {
      return res.status(500).send({ error: "No links found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "No links found" });
  }
};
