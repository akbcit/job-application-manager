import { UserRepo } from "../data/db/mongoRepos/user.repo.js";
import { CandidateRepo } from "../data/db/mongoRepos/candidate.repo.js";

const userRepo = new UserRepo();
const candidateRepo = new CandidateRepo();

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

export const addJobQuery = async (req, res) => {
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
    if (!candidate) {
      return res.status(404).send({ error: "Candidate not found" });
    }
    // get candidate id 
    const id = candidate.id;

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const startJobSearch = async (req,res)=>{

}
