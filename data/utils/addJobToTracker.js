import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trackedJobsFilePath = path.join(__dirname, "../", "trackedJobs.json");

export const addJobToTracker = (jobObject) => {
  try {
    const trackedJobs = JSON.parse(fs.readFileSync(trackedJobsFilePath, "utf-8"));
    trackedJobs.push(jobObject);
    const updatedTrackedJobsData = JSON.stringify(trackedJobs, null, 2); 
    fs.writeFileSync(trackedJobsFilePath, updatedTrackedJobsData);
  } catch (err) {
    console.log(err);
  }
};
