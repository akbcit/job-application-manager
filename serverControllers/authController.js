import axios from "axios";
import dotenv from "dotenv";
import { UserRepo } from "../data/db/user.repo.js";
import { getNewAccessToken } from "../auth/googleAuth/getNewAccessToken.js";
import { verifyGoogleToken } from "../auth/googleAuth/verifyGoogleToken.js";

dotenv.config();

const userRepo = new UserRepo();

const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    res.clearCookie("refreshToken");
    return res.status(200).send({ message: "Logged out successfully" });
  });
};

export const googleSignIn = async (req, res) => {
  const authorizationCode = req.body.code;

  if (!authorizationCode) {
    return res.status(400).send({ error: "No authorization code found" });
  }

  try {
    // Exchange the authorization code for tokens
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    const { access_token, refresh_token, id_token, expires_in } = response.data;

    // Verify the access token and get user info
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    );

    const { email, given_name, family_name, picture } = userInfoResponse.data;
    const user = {
      email: email,
      source: "Google",
      firstName: given_name,
    };
    if (family_name) {
      user.lastName = family_name;
    }
    if (picture) {
      user.pictureUrl = picture;
    }
    let isFirstLogin = false;
    // check if user exists already
    let existingUser = await userRepo.findUser(email);
    if (!existingUser) {
      user.signUpDate = new Date().toISOString().split("T")[0];
      existingUser = await userRepo.createUser(user);
      isFirstLogin = true;
    }

    // Set session data
    req.session.user = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      picture: existingUser.picture,
      authType: "google",
      accessToken: access_token,
      refreshToken: refresh_token,
    };

    const userDetails = {
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName || "",
      pictureUrl: existingUser.pictureUrl || "",
      isFirstLogin,
      source: existingUser.source,
      signUpDate: existingUser.signUpDate,
    };

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const loginResponse = {
      userDetails: userDetails,
      accessToken: access_token,
    };

    return res.status(200).send(loginResponse);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Unable to authenticate" });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(req.cookies);
  if (!refreshToken) {
    return res.status(401).send({ error: "No refresh token provided" });
  }
  if (req.session && req.session.user) {
    const authSource = req.session.user.authType;
    if (authSource === "google") {
      try {
        const { accessToken } = await getNewAccessToken(refreshToken);
        const verifiedEmail = await verifyGoogleToken(accessToken);
        if (verifiedEmail === req.session.user.email) {
          // Update session with new access token
          req.session.user.accessToken = accessToken;
          return res.status(200).send({ accessToken });
        } else {
          handleLogout(req, res);
          return res.status(401).send({ error: "Unauthorized access" });
        }
      } catch (err) {
        handleLogout(req, res);
        console.error("Unable to issue new access token", err);
        return res
          .status(401)
          .send({ error: "Unable to issue new access token" });
      }
    }
  } else {
    handleLogout(req, res);
    return res.status(401).send({ error: "Unauthenticated user" });
  }
};

export const logout = (req, res) => {
  handleLogout(req, res);
};
