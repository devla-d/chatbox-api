import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../config/config";
import User from "./user";

class Group extends Model<
  InferAttributes<Group>,
  InferCreationAttributes<Group>
> {
  declare id?: number;
  declare adminId: number;
  // declare users: Array<number>;
  declare name?: string;
}
Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // users: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   allowNull: true,
    // },
  },
  {
    sequelize,
    modelName: "group",
  }
);

User.belongsToMany(Group, { through: "users_group" });
Group.belongsToMany(User, { through: "users_group" });

export default Group;
