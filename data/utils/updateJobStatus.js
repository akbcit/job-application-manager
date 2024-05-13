import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trackedJobsFilePath = path.join(__dirname, "../", "trackedJobs.json");

export const updateJobStatus = (jobId, updatedStatus) => {
  try {
    const trackedJobs = JSON.parse(
      fs.readFileSync(trackedJobsFilePath, "utf-8")
    );
    const foundJob = trackedJobs.find(job => job.jobId === jobId);
    if (foundJob) {
      foundJob.status = updatedStatus;
    }

    const updatedTrackedJobsData = JSON.stringify(trackedJobs, null, 2);
    fs.writeFileSync(trackedJobsFilePath, updatedTrackedJobsData);
    return trackedJobs;
  } catch (err) {
    console.log(err);
    return false;
  }
};
