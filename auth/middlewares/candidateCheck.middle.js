import { UserRepo } from "../../data/db/mongoRepos/user.repo.js";
import { CandidateRepo } from "../../data/db/mongoRepos/candidate.repo.js";

const userRepo = new UserRepo();
const candidateRepo = new CandidateRepo();

export const candidateCheck = async (req, res, next) => {
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
    // attach candidate details to session
    req.session.user.candidateDetails = candidate;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal server error" });
  }
};
