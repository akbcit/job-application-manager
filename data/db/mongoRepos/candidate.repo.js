import Candidate from "../mongoModels/candidate.mongo.model.js";

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
}
