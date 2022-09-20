import jwt, { Secret } from "jsonwebtoken";
import AuthToken from "../models/authtoken";
import { AuthUser } from "../types";
import User from "../models/user";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_PRIVATE_KEY: Secret = process.env
  .ACCESS_TOKEN_PRIVATE_KEY as Secret;
const REFRESH_TOKEN_PRIVATE_KEY: Secret = process.env
  .REFRESH_TOKEN_PRIVATE_KEY as Secret;

const generateTokens = async (user: User) => {
  try {
    const payload = {
      id: user.id,
      role: user.roles,
      username: user.username,
      email: user.email,
    };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "10m",
    });

    const authToken = await AuthToken.findOne({ where: { UserId: user.id } });
    if (authToken) await authToken.destroy();

    await AuthToken.create({ UserId: user.id, refreshToken });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const newAccessToken = (user: AuthUser) => {
  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
    email: user.email,
  };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "20s",
  });

  return accessToken;
};
export default generateTokens;
