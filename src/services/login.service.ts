import Joi from "joi";

const LoginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { LoginSchema };
