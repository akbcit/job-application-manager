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
      const uniqueJobQueries = await JobSearchQuery.aggregate([
        {
          $group: {
            _id: {
              jobTitle: "$jobTitle",
              city: "$city",
              country: "$country",
            },
          },
        },
        {
          $project: {
            _id: 0,
            jobTitle: "$_id.jobTitle",
            city: "$_id.city",
            country: "$_id.country",
          },
        },
      ]);
      return uniqueJobQueries;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
