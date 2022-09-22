import sequelizeConnection from "./config";
import Group from "../models/group";
import Authtoken from "../models/authtoken";
import User from "../models/user";

const syncDb = () => {
  sequelizeConnection
    .sync({ force: true })
    .then(() => {
      console.log("  table created successfully!");
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const dBInit = async () => {
  await sequelizeConnection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      syncDb();
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};

export default dBInit;
