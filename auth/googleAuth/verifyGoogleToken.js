import axios from "axios";

export const verifyGoogleToken = async (token) => {
  // verify accessToken
  let tokenVerificationResponse = "";
  try {
    tokenVerificationResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );
    console.log(tokenVerificationResponse.data);
    if (tokenVerificationResponse.data.error) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return tokenVerificationResponse.data.email;
};
