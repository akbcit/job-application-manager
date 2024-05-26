import { JobSearchQuery } from "../mongoModels/jobSearchQuery.mongo.model.js";

export class JobQueryRepo {
  async addJobQuery(jobQueryObj) {
    try {
      const jobQueryDoc = new JobSearchQuery(jobQueryObj);
      await jobQueryDoc.save();
      console.log(jobQueryDoc);
      if (jobQueryDoc) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async getAllJobQueriesForCandidate(candidateId) {
    try {
      const jobQueries = await JobSearchQuery.find({
        candidateId: candidateId,
      });
      return jobQueries;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async deleteJobQuery() {}
}
