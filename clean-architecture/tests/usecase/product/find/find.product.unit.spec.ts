import { Product } from "../../../../src/domain/product/entity/product";
import { ProductRepository } from "../../../../src/infrastructure/product/repository/memory/product.repository";
import { FindProductUseCase } from "../../../../src/usecase/product/find/find.product.usecase";

describe("FindProductUseCase unit test", () => {
  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "1",
    };

    const output = await usecase.execute(input);

    expect(output.id).toBe("1");
    expect(output.name).toBe("Product 1");
    expect(output.price).toBe(100);
  });

  it("should throw error when product is not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "no-existing-id",
    };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
