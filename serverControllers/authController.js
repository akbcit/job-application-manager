import { UserRepo } from "../data/db/user.repo.js";
import axios from "axios";

const userRepo = new UserRepo();

export const googleSignIn = async (req, res) => {
  const accessToken = req.body.token;
  if (!accessToken) {
    return res.status(400).send({ error: "No access token found" });
  }

  try {
    // Verify the token with Google
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    );

    const { email, given_name, family_name, picture } = response.data;
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
    return res.status(200).send(userDetails);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Unable to authenticate" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).send({ message: "Logged out successfully" });
  });
};
