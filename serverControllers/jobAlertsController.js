import dotenv from "dotenv";
dotenv.config();
import { fetchEmailsFromSender } from "../services/google/gmail/fetchEmailsFromSender.js";
import { extractLinks } from "../services/puppeteer/extractLinks.js";
import { JobAlertLinkRepo } from "../data/db/mongoRepos/jobAlertLink.repo.js";

const jobAlertLinkRepo = new JobAlertLinkRepo();

export const parseGmailInbox = async (req, res) => {
  // get candidate id
  const candidateId = req.session.user.candidateDetails.id;
  const senderEmail = req.params.emailFrom;
  const scanRange = req.params.scanRange;

  const allowedScanRanges = ["today", "last-three-days", "last-week"];

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
    const emails = await fetchEmailsFromSender(
      accessToken,
      senderEmail,
      scanRange
    );
    const links = await extractLinks(emails, senderEmail, candidateId);
    // save links to DB
    const saveLinksResponse = await jobAlertLinkRepo.saveLinksForCandidate(
      links
    );
    if (saveLinksResponse) {
      return res.status(200).send({ success: "Links saved successfully!" });
    } else {
      return res.status(500).send({ error: "Error saving links" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Failed to fetch emails" });
  }
};

export const getLinksForCandidate = async (req, res) => {
  // get candidate id
  const candidateId = req.session.user.candidateDetails.id;
  const links = await jobAlertLinkRepo.getAllLinksForCandidate(candidateId);
  if (links) {
    return res.status(200).send({ links: links });
  } else {
    return res.status(500).send({ error: "Failed to fetch links" });
  }
};

export const deleteLinksForCandidate = async (req, res) => {
  // get candidate id
  const candidateId = req.session.user.candidateDetails.id;
  const response = await jobAlertLinkRepo.deleteAllLinksForCandidate(
    candidateId
  );
  if (response) {
    return res.status(200).send({ success: "all links deleted" });
  } else {
    return res.status(500).send({ error: "Failed to delete links" });
  }
};

export const deleteLinkById = async (req, res) => {
  // get candidate id
  const candidateId = req.session.user.candidateDetails.id;
  const linkId = req.params.linkId;
  const response = await jobAlertLinkRepo.deleteLink(candidateId, linkId);
  if (response) {
    return res.status(200).send({ success: "link deleted" });
  } else {
    return res.status(500).send({ error: "Failed to delete link" });
  }
};

export const deleteAllLinks = async (req, res) => {
  // get candidate id
  const candidateId = req.session.user.candidateDetails.id;
  const response = await jobAlertLinkRepo.deleteAllLinksForCandidate(candidateId);
  if (response) {
    return res.status(200).send({ success: "links deleted" });
  } else {
    return res.status(500).send({ error: "Failed to delete links" });
  }
};
