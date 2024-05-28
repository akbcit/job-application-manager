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

  async deleteJobQuery(_id) {
    try {
      const result = await JobSearchQuery.deleteOne({ _id });
      if (result.deletedCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getUniqueJobQueries() {
    try {
      const uniqueJobQueries = await JobSearchQuery.distinct("query_string");
      console.log(uniqueJobQueries);
      return uniqueJobQueries;
    } catch (err) {
      console.error("Error fetching unique job queries:", err);
      return false;
    }
  }
}
