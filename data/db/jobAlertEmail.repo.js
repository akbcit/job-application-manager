import { JobAlertEmail } from "./mongoModels/jobAlertEmailSchema.mongo.model.js";

export class JobAlertEmailRepo {
  async getAllEmails() {
    try {
      const emails = await JobAlertEmail.find({});
      return emails;
    } catch (error) {
      console.error("Error fetching job alert emails:", error);
      throw error;
    }
  }

  async deleteAllEmails() {
    try {
      const result = await JobAlertEmail.deleteMany({});
      return result;
    } catch (error) {
      console.error("Error deleting job alert emails:", error);
      throw error;
    }
  }

  async deleteEmailById(id) {
    try {
      const result = await JobAlertEmail.findByIdAndDelete(id);
      if (!result) {
        console.log(`No email found with ID ${id}`);
        return null;
      }
      console.log(`Deleted email with ID ${id}`);
      return result;
    } catch (error) {
      console.error(`Error deleting job alert email with ID ${id}:`, error);
      throw error;
    }
  }
}
