import mongoose from "mongoose";

const jobAlertEmailSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  sender:{
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  links: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true 
});

export const JobAlertEmail = mongoose.model('JobAlertEmails', jobAlertEmailSchema);
