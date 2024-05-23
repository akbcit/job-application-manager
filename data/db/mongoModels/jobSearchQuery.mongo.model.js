import mongoose from "mongoose";

export const jobSearchQuery = new mongoose.Schema({
  jobTitle: String,
  city: String,
  country: String,
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
