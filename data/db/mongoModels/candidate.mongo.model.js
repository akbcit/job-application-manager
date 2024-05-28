import mongoose from "mongoose";
import { Schema } from "mongoose";

const CandidateSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  candidateName: {
    type: String,
    required: true,
  },
  candidateEmail: {
    type: String,
    required: true,
    unique: true,
  },
  resumeIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
  candidateLocation: {
    type: String,
  },
  candidateCountry: {
    type: String,
  },
  candidatePhone: {
    type: String,
  },
  candidateLinkedInUrl: {
    type: String,
  },
  candidateGitHubUrl: {
    type: String,
  },
  candidatePersonalUrl: {
    type: String,
  },
  jobSearch: {
    type: Boolean,
    default: false,
  },
  excludedJobsIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "SearchedJob" },
  ],
});

export const Candidate = mongoose.model("Candidate", CandidateSchema);
