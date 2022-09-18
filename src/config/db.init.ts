import AuthToken from "../models/authtoken.model";
import User from "../models/user.model";
import sequelizeConnection from "./db.config";

User.hasOne(AuthToken, { foreignKey: "userId" });

const dBInit = async () => {
  await sequelizeConnection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};

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

export default dBInit;
export { syncDb };
