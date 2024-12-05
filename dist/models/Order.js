"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const User_1 = __importDefault(require("./User"));
const Product_1 = __importDefault(require("./Product"));
class Order extends sequelize_1.Model {
}
Order.init({
    quantity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    orderDate: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: sequelize_1.DataTypes.NOW },
}, { sequelize: db_1.default, modelName: "order" });
// Associations
User_1.default.hasMany(Order);
Order.belongsTo(User_1.default);
Product_1.default.hasMany(Order);
Order.belongsTo(Product_1.default);
exports.default = Order;
