import { JobSearchResultRepo } from "../data/db/mongoRepos/jobSearchResult.repo.js";
import { SearchedJobRepo } from "../data/db/mongoRepos/searchedJob.repo.js";
import { connectMongoDb } from "../data/db/connect/connectMongoDb.js";


const jobSearchResultRepo = new JobSearchResultRepo();
const searchedJobRepo = new SearchedJobRepo();

const SEARCH_SOURCE = "JSearch";

export const extractJobsFromSearchResultsJSearch = async () => {
  try {
    await connectMongoDb();
    const results = await jobSearchResultRepo.getAllResults();
    
    for (const result of results) {
      for (const job of result.results) {
        const jobObj = {
          job_id: job.job_id,
          search_source: SEARCH_SOURCE,
          employer_name: job.employer_name,
          job_employment_type: job.job_employment_type,
          job_apply_link: job.job_apply_link,
          job_title: job.job_title,
          job_city: job.job_city,
          job_state: job.job_state,
          job_country: job.job_country,
          job_google_link: job.job_google_link,
          required_experience_in_months: job.job_required_experience ? job.job_required_experience.required_experience_in_months : null,
          job_required_skills: job.job_required_skills,
          job_min_salary: job.job_min_salary,
          job_max_salary: job.job_max_salary,
          job_salary_currency: job.job_salary_currency,
          job_salary_period: job.job_salary_period,
          job_posted_at_timestamp: job.job_posted_at_timestamp,
          job_is_remote: job.job_is_remote,
          job_description: job.job_description,
          apply_options: job.apply_options,
        };

        // Save job if it does not violate constraints
        const saved = await searchedJobRepo.addSearchedJob(jobObj);
        if (!saved) {
          console.error(`Failed to save job with ID: ${job.job_id}`);
        }
      }
    }
  } catch (error) {
    console.error("Error extracting jobs from search results:", error);
  }
};

// Execute the function
extractJobsFromSearchResultsJSearch()
  .then(() => console.log("All valid jobs have been processed."))
  .catch(error => console.error("Error processing jobs:", error));
