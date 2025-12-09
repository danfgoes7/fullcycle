import { Product } from "../../../../src/domain/product/entity/product";
import { ProductRepository } from "../../../../src/infrastructure/product/repository/memory/product.repository";
import { UpdateProductUseCase } from "../../../../src/usecase/product/update/update.product.usecase";

describe("UpdateProductUseCase unit test", () => {
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Updated Product",
      price: 150,
    };

    const output = await usecase.execute(input);

    expect(output.id).toBe("1");
    expect(output.name).toBe("Updated Product");
    expect(output.price).toBe(150);

    const updated = await productRepository.find("1");
    expect(updated.name).toBe("Updated Product");
    expect(updated.price).toBe(150);
  });

  it("should throw error when product is not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "no-existing-id",
      name: "Test",
      price: 100,
    };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
