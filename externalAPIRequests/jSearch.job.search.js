import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.X_RapidAPI_Key;

export const jSearch = async (query, date_posted = 'today') => {
  const params = {
    query: query,
    date_posted: date_posted, // Set default value to 'today'
  };

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: params,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  console.log(`Request URL: ${options.url}`);
  console.log(`Request Params: ${JSON.stringify(params)}`);

  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error("Error making the request:", error);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    }
    return false;
  }
};
