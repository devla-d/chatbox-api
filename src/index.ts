import App from "./app";
import { AppDataSource } from "./config/db.config";

AppDataSource.initialize()
  .then(() => {
    console.log("connected to database");
    App.listen(3004, () => {
      console.log("listening to port 3004");
    });
  })
  .catch((error) => console.log(error));
