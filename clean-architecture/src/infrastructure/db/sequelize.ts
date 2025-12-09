import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../product/repository/sequelize/product.model";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

sequelize.addModels([ProductModel]);

