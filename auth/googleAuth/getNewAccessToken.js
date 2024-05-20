import axios from "axios";

export const getNewAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    const { access_token, expires_in } = response.data;
    return access_token;
  } catch (error) {
    console.error(
      "Failed to refresh access token",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to refresh access token");
  }
};
