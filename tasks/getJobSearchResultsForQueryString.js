import { jSearch } from "../externalAPIRequests/jSearch.job.search.js";

export const getJobSearchResultsForQueryString = async (queryString) => {
  console.log("Query String: ", queryString);

  if (!queryString) {
    return { queryString, queryResults: [] };
  }

  try {
    const queryResults = await jSearch(queryString, 'today');

    // Logging the results
    console.log(`Results for query: ${queryString}`);
    console.log(JSON.stringify(queryResults, null, 2));

    return { queryString, queryResults };
  } catch (error) {
    console.error("Error fetching job search results:", error);
    return { queryString, queryResults: [] };
  }
};
