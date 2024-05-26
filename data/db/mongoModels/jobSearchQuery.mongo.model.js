import mongoose from "mongoose";

const jobSearchQuerySchema = new mongoose.Schema({
  jobTitle: String,
  city: String,
  country: String,
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

// Create a compound unique index on jobTitle, city, country, and candidateId
jobSearchQuerySchema.index(
  { jobTitle: 1, city: 1, country: 1, candidateId: 1 },
  { unique: true }
);

export const JobSearchQuery = new mongoose.model(
  "JobSearchQuery",
  jobSearchQuerySchema
);
