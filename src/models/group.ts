import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../config/config";

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare adminId: number;
  declare users: Array<number>;
  declare name: string;

  static associate(models: any) {
    // define association here
    Groups.hasMany(models.User);
  }
}
Groups.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "Group",
  }
);

export default Groups;
