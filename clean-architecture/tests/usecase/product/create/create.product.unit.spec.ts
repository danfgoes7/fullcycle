import { CreateProductUseCase } from "../../../../src/usecase/product/create/create.product.usecase";
import { ProductRepository } from "../../../../src/infrastructure/product/repository/memory/product.repository";

describe("CreateProductUseCase unit test", () => {
  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe("Product 1");
    expect(output.price).toBe(100);

    // garante que realmente foi salvo no "banco" em memória
    const saved = await productRepository.find(output.id);
    expect(saved.name).toBe("Product 1");
    expect(saved.price).toBe(100);
  });
});
