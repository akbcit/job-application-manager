import { User } from "./mongoModels/user.mongo.model.js";

export class UserRepo {
  async createUser(user) {
    try {
      const newUser = new User(user);
      newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findUser(email) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
