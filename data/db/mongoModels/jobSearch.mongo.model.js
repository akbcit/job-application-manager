import mongoose from "mongoose";

const jobDetailsSchema = new mongoose.Schema({
  company: {
    type: String,
    default: null,
  },
  compensation: {
    type: Number,
    default: null,
  },
  jobTitle: {
    type: String,
    default: null,
  },
  jobType: {
    type: String,
    enum: ["Remote", "Hybrid", "On-site"],
    required: true,
  },
});

const compensationSchema = new mongoose.Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "CAD", "EUR", "GBP", "INR", "JPY", "AUD", "Other"],
  },
});

const jobPreferenceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry", "Mid", "Senior", "Manager", "Executive"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mobility: {
    type: String,
    enum: ["Remote", "On-site", "Hybrid"],
    required: true,
  },
  desiredCompensation: {
    type: compensationSchema,
    required: true,
  },
});

const jobTitleSchema = new mongoose.Schema({
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
    default: null,
  },
  endOutcome: {
    type: String,
    enum: ["JobGotten", "JobNotGotten", "StillSearching"],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry", "Mid", "Senior", "Manager", "Executive"],
    required: true,
  },
  jobPreferences: {
    type: [jobPreferenceSchema],
  },
  jobGottenDetails: {
    type: jobDetailsSchema,
    default: null,
  },
});

const jobSearchSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  jobTitles: [jobTitleSchema],
  jobSearchDetails: [jobPreferenceSchema],
});

export const JobSearch = mongoose.model("JobSearch", jobSearchSchema);
