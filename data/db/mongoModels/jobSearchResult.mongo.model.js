import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSearchResultSchema = new Schema({
  queryString: { type: String, required: true },
  sourceAPI: { type: String, required: true },
  results: { type: Schema.Types.Mixed, required: true },
  fetchedAt: { type: Date, default: Date.now }
});

export const JobSearchResult = mongoose.model("JobSearchResult", jobSearchResultSchema);
