import { Product } from "../../../../src/domain/product/entity/product";

describe("Product entity unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrow("product: Name is required");
  });

  it("should throw error when price is less than or equal to zero", () => {
    expect(() => {
      new Product("1", "Product 1", 0);
    }).toThrow("product: Price must be greater than zero");
  });

  it("should accumulate errors when name and price are invalid", () => {
    expect(() => {
      new Product("1", "", 0);
    }).toThrow(
      "product: Name is required, product: Price must be greater than zero"
    );
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
