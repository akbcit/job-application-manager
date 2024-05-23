import { Candidate } from "../mongoModels/candidate.mongo.model.js";
import { UserRepo } from "./user.repo.js";

const userRepo = new UserRepo();

export class CandidateRepo {
  async findCandidateByEmail(email) {
    try {
      const candidate = await Candidate.findOne({ candidateEmail: email });
      return candidate || false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createCandidate(candidateDetails) {
    try {
      const candidateDoc = new Candidate(candidateDetails);
      await candidateDoc.save();
      return candidateDoc;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
