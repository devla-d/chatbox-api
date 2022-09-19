import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import sequelize from "../config/db.config";

class Group extends Model<
  InferAttributes<Group>,
  InferCreationAttributes<Group>
> {
  declare messages: string;
}

Group.init(
  {
    messages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "group",
  }
);

export default Group;
