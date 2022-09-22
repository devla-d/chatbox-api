import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;

const sequelizeConnection = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
);

export default sequelizeConnection;
