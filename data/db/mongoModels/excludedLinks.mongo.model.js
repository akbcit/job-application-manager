import mongoose from "mongoose";

const excludedLinksSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export const ExcludedLink = mongoose.model("ExcludedLink", excludedLinksSchema);
