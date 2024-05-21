const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobExperienceSchema = new Schema({
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

const ProjectSchema = new Schema({
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

const EducationSchema = new Schema({
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

const ResumeSchema = new Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
  },
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
  versionName: {
    type: String,
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

const JobExperience = mongoose.model("JobExperience", JobExperienceSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Education = mongoose.model("Education", EducationSchema);
const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = { JobExperience, Project, Education, Resume };
