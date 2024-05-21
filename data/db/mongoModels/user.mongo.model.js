import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true,
  },
  source: {
    type: String,
    required: true,
    enum: ["Google", "LinkedIn"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  signUpDate: {
    type: Date,
    required: true,
  },
  pictureUrl: {
    type: String,
  },
  role: {
    type: String,
  },
});

export const User = mongoose.model("Users", userSchema);
