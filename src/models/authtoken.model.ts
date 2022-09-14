import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Association,
} from "sequelize";
import User from "./user.model";
import sequelize from "../config/db.config";

class AuthToken extends Model<
  InferAttributes<AuthToken>,
  InferCreationAttributes<AuthToken>
> {
  declare userId: number;
  declare refreshToken: string;
  declare expiresAt: Date;
}

AuthToken.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "authtoken",
  }
);

User.hasOne(AuthToken, { foreignKey: "userId" });

export default AuthToken;
