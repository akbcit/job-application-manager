import dotenv from "dotenv";
import { connectMongoDb } from "../data/db/connect/connectMongoDb.js";
import { JobSearchResultRepo } from "../data/db/mongoRepos/jobSearchResult.repo.js";

dotenv.config();

const jobSearchResultRepo = new JobSearchResultRepo();

const deleteJobSearchResultsByDate = async (date) => {
  await connectMongoDb();
  
  try {
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      console.error("Invalid date format");
      process.exit(1);
    }
    
    const success = await jobSearchResultRepo.deleteAllResultsByDate(formattedDate);
    if (success) {
      console.log(`Successfully deleted job search results before date: ${formattedDate}`);
    } else {
      console.log(`No job search results found before date: ${formattedDate}`);
    }
  } catch (error) {
    console.error("Error deleting job search results by date:", error);
  } finally {
    process.exit(0);
  }
};

// Parse the date from command-line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Please provide a date in the format YYYY-MM-DD");
  process.exit(1);
}

const date = args[0];
deleteJobSearchResultsByDate(date);
