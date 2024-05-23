import mongoose from "mongoose";

const PersonalInfoSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
  },
  candidateLinkedin: {
    type: String,
  },
  candidatePhone: {
    type: String,
  },
  candidateLocation: {
    type: String,
    required: true,
  },
  candidateCountry: {
    type: String,
    required: true,
  },
});

const JobExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
});

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  skillsShowcased: [
    {
      type: String,
      required: true,
    },
  ],
});

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  achievements: [
    {
      type: String,
    },
  ],
});

const ResumeSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  resumeVersionName: {
    type: String,
  },
  personalInfo: PersonalInfoSchema,
  candidateSkills: [
    {
      type: String,
    },
  ],
  candidateHeadline: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
  },
  jobExperiences: [JobExperienceSchema],
  projects: [ProjectSchema],
  education: [EducationSchema],
  languages: [
    {
      type: String,
    },
  ],
});

// Add unique compound index
ResumeSchema.index({ candidateId: 1, resumeVersionName: 1 }, { unique: true });

export const JobExperience = mongoose.model(
  "JobExperience",
  JobExperienceSchema
);
export const Project = mongoose.model("Project", ProjectSchema);
export const Education = mongoose.model("Education", EducationSchema);
export const Resume = mongoose.model("Resume", ResumeSchema);
