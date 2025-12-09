import request from "supertest";
import { app } from "../../../src/infrastructure/api/app";
import { sequelize } from "../../../src/infrastructure/db/sequelize";
import { ProductModel } from "../../../src/infrastructure/product/repository/sequelize/product.model";

describe("E2E test for product list", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("should list products", async () => {
    // cria alguns produtos direto na base
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      price: 200,
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);

    expect(response.body.products[0].id).toBe("1");
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(100);

    expect(response.body.products[1].id).toBe("2");
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(200);
  });
});
