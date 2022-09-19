import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateTokens from "../services/generate-token.service";
import { LoginSchema } from "../services/login.service";
import { CustomError } from "../services/custom-error.service";
import { RegisterType } from "../types";
import User from "../models/user";

export const regisTerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as RegisterType;
  try {
    const passwordHash = await bcrypt.hash(password!, 10);

    const user = await User.create({
      username: username!,
      email: email!,
      password: passwordHash,
      roles: "user",
      online: false,
    });

    return res
      .status(200)
      .json({ username: user.username, msg: "successfully registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  const { error } = LoginSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((e) => e.message);
    return res.json({ error: errors });
  }
  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) return res.json({ error: "Invalid username Or password" });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const { accessToken, refreshToken } = await generateTokens(user);
      return res.json({
        msg: "Sucessfuly loggin",
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
    return res.json({ error: "Invalid username Or password" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const GetExistingData = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    const UsersEmail = users.map((user) => user.email);
    const UsersUsername = users.map((user) => user.username);

    return res.json({ UsersEmail, UsersUsername });
  } catch (error) {
    console.log(error);
    throw new CustomError("An internal Error occured");
  }
};
