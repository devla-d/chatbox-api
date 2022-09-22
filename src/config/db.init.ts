import { AppDataSource } from "./";

const initDb = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => console.log(error));
};

export default initDb;
