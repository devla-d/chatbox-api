import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import User from "../models/User";
dotenv.config();

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
