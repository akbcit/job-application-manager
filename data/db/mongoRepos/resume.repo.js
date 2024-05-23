import { Resume } from "../mongoModels/resume.mongo.model.js";

export class ResumeRepo {
  async createResume(candidateId, resumeVersionName) {
    try {
      // Create new resume
      const newResume = new Resume({
        candidateId,
        resumeVersionName,
        lastUpdated: new Date(),
      });

      await newResume.save();
      return newResume;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Duplicate resume version name for this candidate");
      }
      throw new Error(`Error creating resume: ${error.message}`);
    }
  }

  async getAllResumeVersionsForCandidate(candidateId) {
    try {
      // Get all resume versions for the candidate
      const resumes = await Resume.find({ candidateId }, "resumeVersionName");

      if (!resumes.length) {
        return [];
      }

      // Extract and return the resume version names
      const resumeVersionNames = resumes.map(
        (resume) => resume.resumeVersionName
      );
      return resumeVersionNames;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
