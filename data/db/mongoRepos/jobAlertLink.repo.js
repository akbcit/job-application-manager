import { JobAlertLink } from "../mongoModels/jobAlertLink.mongo.model.js";

export class JobAlertLinkRepo {
  async getAllLinksForCandidate(candidateId) {
    console.log(candidateId);
    try{
      const links = await JobAlertLink.find({
        candidateId: candidateId,
      });
      return links;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  async deleteLink(candidateId, linkId) {
    try {
      const result = await JobAlertLink.findOneAndDelete({ _id: linkId, candidateId: candidateId });
      return result ? true : false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteAllLinksForCandidate(candidateId) {
    try {
      await JobAlertLink.deleteMany({
        candidateId: candidateId,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async saveLinksForCandidate(linkObjects) {
    try {
      await JobAlertLink.insertMany(linkObjects);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
