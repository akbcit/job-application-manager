import Candidate from "../mongoModels/candidate.mongo.model.js";
import { UserRepo } from "./user.repo.js";

const userRepo = new UserRepo();

export class CandidateRepo {
  async findCandidateByEmail(email) {
    try {
      let candidate = Candidate.findOne({ email });
      if (candidate) {
        return candidate;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async createCandidate(email,candidateDetails) {
    // first check if user exists
    const user = await userRepo.findUser(email);
    // if no user found return false
    if (!user) {
      return false;
    }
    // else create candidate
    const candidateObj = {
      ...candidateDetails,
      userId:user.id
    }
    // create a new candidate doc
    try{
      const candidateDoc = new Candidate(candidateObj);
      await candidateDoc.save();
      return candidateDoc;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }
}
