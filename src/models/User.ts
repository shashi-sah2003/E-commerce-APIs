import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class User extends Model {
  public name!: string;
}
User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "user" }
);

export default User;
