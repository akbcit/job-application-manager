import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const trackedJobsFilePath = path.join(__dirname, "../", "trackedJobs.json");

export const addJobToTracker = () => {
  try {
    const trackedJobs = fs.readFileSync(trackedJobsFilePath, "utf-8");
    console.log(trackedJobs);
  } catch (err) {
    console.log(err);
  }
};
