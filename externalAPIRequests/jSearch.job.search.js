import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.X_RapidAPI_Key;

export const jSearch = async (jobTitle, city, country, page, num_pages) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: `${jobTitle} in ${city}, ${country}`,
      page: page,
      num_pages: num_pages,
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};
