import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../config/config";
import User from "./user";

class Authtoken extends Model<InferAttributes<Authtoken>> {
  declare UserId?: number;
  declare refreshToken: string;
}
Authtoken.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "authtoken",
  }
);

User.hasOne(Authtoken);
Authtoken.belongsTo(User);
export default Authtoken;
