import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Product extends Model {

  public id!: number;
  public name!: string;
  public price!: number;
  public category!: string;
  public stock!: number; 

}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, modelName: "product" }
);

export default Product;
