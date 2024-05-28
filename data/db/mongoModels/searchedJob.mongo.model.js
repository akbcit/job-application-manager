import mongoose from "mongoose";

const applyOptionsSchema = new mongoose.Schema(
  {
    publisher: { type: String, default: null },
    apply_link: { type: String, default: null },
    is_direct: { type: Boolean, default: null },
  },
  { _id: false }
);

const searchedJobSchema = new mongoose.Schema({
  job_id: { type: String, required: true, unique: true },
  job_search_query: { type: String, required: true },
  search_source: { type: String, required: true },
  employer_name: { type: String, default: null },
  job_employment_type: { type: String, default: null },
  job_apply_link: { type: String, default: null },
  job_title: { type: String, required: true },
  job_city: { type: String, required: true },
  job_state: { type: String, default: null },
  job_country: { type: String, required: true },
  job_google_link: { type: String, default: null },
  required_experience_in_months: { type: Number, default: null },
  job_required_skills: { type: String, default: null },
  job_min_salary: { type: Number, default: null },
  job_max_salary: { type: Number, default: null },
  job_salary_currency: { type: String, default: null },
  job_salary_period: { type: String, default: null },
  job_posted_at_timestamp: { type: Number, default: null },
  job_is_remote: { type: Boolean, default: null },
  job_description: { type: String, default: null },
  apply_options: [applyOptionsSchema],
});

// Define the composite index
searchedJobSchema.index(
  {
    employer_name: 1,
    job_title: 1,
    job_city: 1,
    job_country: 1,
    job_posted_at_timestamp: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      employer_name: { $exists: true, $ne: null },
      job_title: { $exists: true, $ne: null },
      job_city: { $exists: true, $ne: null },
      job_country: { $exists: true, $ne: null },
      job_posted_at_timestamp: { $exists: true, $ne: null },
    },
  }
);

export const SearchedJob = mongoose.model("SearchedJob", searchedJobSchema);
