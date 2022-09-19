import Joi from "joi";
import User from "../models/user";

const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const RegSchema = Joi.object().keys({
  email: Joi.string().min(3).max(50).email().required(),
  username: Joi.string().min(4).max(12).required(),
  password: Joi.string().pattern(passwordRules),
});

const validatEmail = async (email: string) => {
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

const validateUsername = async (username: string) => {
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

export { RegSchema, validatEmail, validateUsername };
