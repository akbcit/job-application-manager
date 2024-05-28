import mongoose from "mongoose";

// Define the schema for job search queries
const jobSearchQuerySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  experienceRequired: {
    type: String,
    required: false,
  },
  query_string: {
    type: String,
  },
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

// Pre-save middleware to generate the query string
jobSearchQuerySchema.pre('save', function (next) {
  const { jobTitle, city, country } = this;
  this.query_string = country ? `${jobTitle} in ${city}, ${country}` : `${jobTitle} in ${city}`;
  next();
});

export const JobSearchQuery = mongoose.model("JobSearchQuery", jobSearchQuerySchema);
