import { SearchedJob } from "../mongoModels/searchedJob.mongo.model.js";

export class SearchedJobRepo {
  // Method to add a new searched job
  async addSearchedJob(jobObj) {
    try {
      const newJob = new SearchedJob(jobObj);
      await newJob.save();
      console.log("Job saved successfully");
      return true;
    } catch (err) {
      console.error("Error saving job:", err);
      return false;
    }
  }

  async deleteSearchedJobById(id) {
    try {
      const result = await SearchedJob.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        console.log("Job deleted successfully");
        return true;
      } else {
        console.log("No job found with the provided ID");
        return false;
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      return false;
    }
  }
}
