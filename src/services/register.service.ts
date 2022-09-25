import Joi from "joi";
import { User } from "../models/User";

export class RegisterService {
  public passwordRules =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

  RegSchema = Joi.object().keys({
    email: Joi.string().min(3).max(50).email().required(),
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().pattern(this.passwordRules).messages({
      "string.pattern.base":
        "password Require at least one numeric digit and a special character",
    }),
  });

  validatEmail = async (email: string) => {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  };

  validateUsername = async (username: string) => {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (user) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  };
}
