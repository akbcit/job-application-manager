import { JobAlertEmail } from "../mongoModels/jobAlertEmailSchema.mongo.model.js";

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

  async deleteLink(linkId) {
    const emailId = linkId.split("-")[0];
    const linkIndex = parseInt(linkId.split("-")[1]);
    try {
      // Use $unset to remove the link at the specified index
      const unsetResult = await JobAlertEmail.updateOne(
        { _id: emailId },
        { $unset: { [`links.${linkIndex}`]: 1 } }
      );
      // If the $unset operation modified the document, then clean up the array
      if (unsetResult.modifiedCount > 0) {
        const pullResult = await JobAlertEmail.updateOne(
          { _id: emailId },
          { $pull: { links: null } } // Remove null values from the links array
        );
        console.log(
          `Link at index ${linkIndex} removed from email ID ${emailId}`
        );
        return pullResult;
      } else {
        console.log(
          `No link found at index ${linkIndex} for email ID ${emailId}`
        );
        return null;
      }
    } catch (error) {
      console.error(
        `Error removing link at index ${linkIndex} from email ID ${emailId}:`,
      );
    }
  }
}
