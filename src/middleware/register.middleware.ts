import { Request, Response, NextFunction } from "express";
import { RegisterService } from "../services/register.service";

const regService = new RegisterService();
const validateReg = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email } = req.body;
  const { error } = regService.RegSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.json({ errors: errors });
  }
  const emailExist = await regService.validatEmail(email);
  const usernameExist = await regService.validateUsername(username);
  if (emailExist) return res.json({ error: "email already exist" });
  if (usernameExist) return res.json({ error: "username already exist" });

  next();
};

export default validateReg;
