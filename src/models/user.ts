import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
    declare id: CreationOptional<number>;
    declare email: string;
    declare username: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare roles: "user" | "admin" | "super_admin";
    declare online: boolean;
    declare image?: string | undefined;
    declare friends?: number[] | undefined;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      roles: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      friends: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
