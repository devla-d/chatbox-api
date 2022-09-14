import { Request, Response, NextFunction } from "express";
import {
  RegSchema,
  validatEmail,
  validateUsername,
} from "../services/register.service";

const validateReg = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body;
  const { error } = RegSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.status(400).json({ errors: errors });
  }
  const emailExist = await validatEmail(email);
  const usernameExist = await validateUsername(username);
  if (emailExist) return res.json({ error: "email already exist" });
  if (usernameExist) return res.json({ error: "username already exist" });

  next();
};

export default validateReg;
