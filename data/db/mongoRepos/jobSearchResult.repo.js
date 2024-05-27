import { JobSearchResult } from "../mongoModels/jobSearchResult.mongo.model.js";

export class JobSearchResultRepo {
  async saveResults(queryString, sourceAPI, results) {
    try {
      const jobSearchResult = new JobSearchResult({
        queryString,
        sourceAPI,
        results,
      });

      await jobSearchResult.save();
      return true;
    } catch (error) {
      console.error("Error saving job search results:", error);
      return false;
    }
  }

  async deleteResultById(id) {
    try {
      const result = await JobSearchResult.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting job search result by ID:", error);
      return false;
    }
  }

  async deleteAllResultsByDate(date) {
    try {
      const result = await JobSearchResult.deleteMany({
        fetchedAt: { $lte: new Date(date) },
      });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting job search results by date:", error);
      return false;
    }
  }

  async deleteAllResults() {
    try {
      const result = await JobSearchResult.deleteMany({});
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting all job search results:", error);
      return false;
    }
  }

  async getAllResults() {
    try {
      const results = await JobSearchResult.find({});
      return results;
    } catch (error) {
      console.error("Error fetching all job search results:", error);
      return [];
    }
  }
}
