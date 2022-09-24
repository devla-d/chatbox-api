import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../models/User";
import Authtoken from "../models/Authtoken";
// import Group from "../models/Group";
dotenv.config();

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_PORT = process.env.DB_PORT as string;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Authtoken],
});
