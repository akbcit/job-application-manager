import { UserRepo } from "../data/db/mongoRepos/user.repo.js";
import { CandidateRepo } from "../data/db/mongoRepos/candidate.repo.js";
import { JobQueryRepo } from "../data/db/mongoRepos/jobQuery.repo.js";
import {SearchedJobRepo} from "../data/db/mongoRepos/searchedJob.repo.js";

const userRepo = new UserRepo();
const candidateRepo = new CandidateRepo();
const jobQueryRepo = new JobQueryRepo();
const searchedJobRepo = new SearchedJobRepo();

export const getProfileSummary = async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.session.user.email) {
      return res.status(401).send({ error: "Unauthorized access!" });
    }
    // get user details from repo
    const user = await userRepo.findUser(email);
    if (!user) {
      return res.status(400).send({ error: "No user found" });
    }
    // check if user is set up as a candidate
    const candidate = await candidateRepo.findCandidateByEmail(email);
    const profileSummary = {
      candidateDetails: candidate || null,
    };
    return res.status(200).send(profileSummary);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getJobQueriesForCandidate = async (req, res) => {
  try {
    // get candidate id
    const id = req.session.user.candidateDetails.id;
    const jobQueries = await jobQueryRepo.getAllJobQueriesForCandidate(id);
    if (jobQueries) {
      return res.status(200).send({ jobQueries: jobQueries });
    } else {
      return res.status(500).send({ error: "Internal server error" });
    }
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const addJobQuery = async (req, res) => {
  try {
    // get candidate id
    const id = req.session.user.candidateDetails.id;
    // check if candidate job search is on
    const jobSearch = req.session.user.jobSearch;
    if (!jobSearch) {
      await candidateRepo.toggleJobSearchById(id);
    }
    // get job query
    const jobQuery = req.body;
    jobQuery.candidateId = id;
    const response = await jobQueryRepo.addJobQuery(jobQuery);
    if (response) {
      return res.status(200).send({ success: "Added query successfully!" });
    } else {
      return res.status(500).send({ error: "Unable to add query" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const deleteJobQuery = async (req, res) => {
  try {
    // get query id
    const queryId = req.params.queryId;
    const response = await jobQueryRepo.deleteJobQuery(queryId);
    if (response) {
      return res.status(200).send({ message: "Delete query successfully" });
    } else {
      return res.status(500).send({ error: "Unable to delete query" });
    }
    return res.status(200).send({ message: queryId });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const startJobSearch = async (req, res) => {
  // get candidate
  const candidate = req.session.user.candidateDetails;
  // status of job search
  if (candidate.jobSearch) {
    return res.status(200).send({ message: "Job Search already on!" });
  }
  const response = await candidateRepo.toggleJobSearchById(candidate._id);
  if (response) {
    return res.status(200).send({ message: "Job Search activated!" });
  } else {
    return res
      .status(500)
      .send({ message: "Some error while activating search" });
  }
};

export const endJobSearch = async (req, res) => {
  // get candidate
  const candidate = req.session.user.candidateDetails;
  // status of job search
  if (!candidate.jobSearch) {
    return res.status(200).send({ message: "Job Search already off!" });
  }
  const response = await candidateRepo.toggleJobSearchById(candidate._id);
  if (response) {
    return res.status(200).send({ message: "Job Search deactivated!" });
  } else {
    return res
      .status(500)
      .send({ message: "Some error while deactivating search" });
  }
};

export const getSearchedJobsForCandidate = async (req, res) => {
  try {
    // get candidate id
    const id = req.session.user.candidateDetails.id;
    const jobQueries = await jobQueryRepo.getAllJobQueriesForCandidate(id);
    const searchedJobs = [];
    if (jobQueries) {
      // for each job query get searched jobs
      for (let jobQuery of jobQueries) {
        // for each query get jobs
        const jobs = await searchedJobRepo.getJobsByQueryString(jobQuery.query_string);
        searchedJobs.push(...jobs);
      }
      return res.status(200).send({ searchedJobs });
    }
  } catch (err) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
