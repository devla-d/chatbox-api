import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../types";
import * as dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret;

const authRequired = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err: any, user) => {
    if (err) return res.status(401).json({ msg: "Token Expired" });

    req.user = user as AuthUser;

    next();
  });
};

export default authRequired;
