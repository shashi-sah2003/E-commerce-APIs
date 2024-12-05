import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import User from "./User";
import Product from "./Product";

class Order extends Model {}
Order.init(
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    orderDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  },
  { sequelize, modelName: "order" }
);

// Associations
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

export default Order;
