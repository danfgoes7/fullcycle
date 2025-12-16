import { CreateProductUseCase } from "./create.product.usecase";
import { ProductRepositoryMemory } from "../__tests__/product.repository.memory";

describe("Create Product — Integration Test", () => {
  it("should create product", async () => {
    const repo = new ProductRepositoryMemory();
    const usecase = new CreateProductUseCase(repo);

    const result = await usecase.execute({ name: "Product", price: 10 });

    expect(result.name).toBe("Product");
    expect(result.price).toBe(10);
    expect(repo.products.length).toBe(1);
  });
});
