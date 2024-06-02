import mongoose from "mongoose";

const jobAlertLinkSchema = new mongoose.Schema({
  emailDate: {
    type: Date,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const JobAlertLink = mongoose.model(
  "JobAlertLink",
  jobAlertLinkSchema
);
