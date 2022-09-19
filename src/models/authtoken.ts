import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../config/config";

class Authtoken extends Model<
  InferAttributes<Authtoken>,
  InferCreationAttributes<Authtoken>
> {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  declare UserId: number;
  declare refreshToken: string;
  static associate(models: any) {
    // define association here
    Authtoken.belongsTo(models.User);
  }
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
    modelName: "Authtoken",
  }
);

export default Authtoken;
