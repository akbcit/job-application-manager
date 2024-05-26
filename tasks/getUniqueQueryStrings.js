import { JobQueryRepo } from "../data/db/mongoRepos/jobQuery.repo.js";
import { convertQueryObjToQueryString } from "../utils/convertQueryObjToQueryString.js";

const jobQueryRepo = new JobQueryRepo();

export const getUniqueQueryStrings = async () => {
  try {
    const results = await jobQueryRepo.getUniqueJobQueries();
    const queryStrings = results.map((result) =>
      convertQueryObjToQueryString(result)
    );
    return queryStrings;
  } catch (err) {
    console.error(err);
    return false;
  }
};
