import { jSearch } from "../externalAPIRequests/jSearch.job.search.js";

export const jSearchQuery = async (req, res) => {
  const { jobTitle, city, country, page, num_pages } = req.body;
  
  if (
    !jobTitle ||
    !city ||
    !country ||
    isNaN(Number(page)) ||
    isNaN(Number(num_pages))
  ) {
    return res.status(400).send({ error: "All params required" });
  }

  try {
    const jobSearchResults = await jSearch(jobTitle, city, country, page, num_pages);
    if (jobSearchResults) {
      return res.status(200).send({ jobSearchResults });
    } else {
      return res.status(500).send({ error: "Internal server error" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
