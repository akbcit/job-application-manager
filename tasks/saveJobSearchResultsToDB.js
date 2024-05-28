import { connectMongoDb } from "../data/db/connect/connectMongoDb.js";
import { getJobSearchResultsForQueryString } from "./getJobSearchResultsForQueryString.js";
import { JobSearchResultRepo } from "../data/db/mongoRepos/jobSearchResult.repo.js";
import {JobQueryRepo} from "../data/db/mongoRepos/jobQuery.repo.js";

const jobSearchResultRepo = new JobSearchResultRepo();
const jobQueryRepo = new JobQueryRepo();

const saveJobSearchResultsToDB = async () => {
  await connectMongoDb();
  const queryStrings = await jobQueryRepo.getUniqueJobQueries();
  console.log("Fetched query strings:", queryStrings);
  for (const queryString of queryStrings) {
    console.log(`Processing query: ${queryString}`);

    const { queryString: qs, queryResults } = await getJobSearchResultsForQueryString(queryString);

    if (qs && queryResults.length > 0) {
      const success = await jobSearchResultRepo.saveResults(qs, "jSearch", queryResults);
      if (success) {
        console.log(`Successfully saved results for query: ${qs}`);
      } else {
        console.log(`Failed to save results for query: ${qs}`);
      }
    } else {
      console.log(`No results found for query: ${queryString}`);
    }

    // Adding a delay to avoid overloading the API and MongoDB
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

saveJobSearchResultsToDB();