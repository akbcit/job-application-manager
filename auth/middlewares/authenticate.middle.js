import axios from "axios";
import { verifyGoogleToken } from "../googleAuth/verifyGoogleToken.js";

export const authenticate = async (req, res, next) => {
  // Get token from header
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  const accessToken = token.split(" ")[1];
  const authType = req.session.user.authType;
  let verifiedEmail;

  try {
    switch (authType) {
      case "google":
        verifiedEmail = await verifyGoogleToken(accessToken);
        if (verifiedEmail === req.session.user.email) {
          return next();
        } else {
          // Try to refresh the token using the refresh token from the cookie
          const refreshToken = req.cookies.refreshToken;
          if (!refreshToken) {
            return res.status(401).send({ error: "No refresh token provided" });
          }

          try {
            const refreshResponse = await axios.post("https://oauth2.googleapis.com/token", {
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: refreshToken,
              grant_type: "refresh_token",
            });

            const { access_token, id_token, expires_in } = refreshResponse.data;

            // Verify the new access token
            verifiedEmail = await verifyGoogleToken(access_token);
            if (verifiedEmail === req.session.user.email) {
              // Set the new access token in the session
              req.session.user.accessToken = access_token;

              // Set the new access token in the response header
              res.setHeader("Authorization", `Bearer ${access_token}`);

              // Optionally set a new refresh token if provided
              if (refreshResponse.data.refresh_token) {
                res.cookie("refreshToken", refreshResponse.data.refresh_token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "Strict",
                  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
              }

              return next();
            } else {
              return res.status(401).send({ error: "Invalid refresh token" });
            }
          } catch (err) {
            console.error("Failed to refresh token", err.response ? err.response.data : err.message);
            return res.status(401).send({ error: "Failed to refresh token" });
          }
        }
      default:
        return res.status(404).send({ error: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};
