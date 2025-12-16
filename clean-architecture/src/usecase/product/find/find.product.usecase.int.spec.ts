import { FindProductUseCase } from "./find.product.usecase";
import { ProductRepositoryMemory } from "../__tests__/product.repository.memory";
import { Product } from "../../../domain/product/entity/product";

describe("Find Product — Integration Test", () => {
  it("should find product", async () => {
    const repo = new ProductRepositoryMemory();
    const product = new Product("1", "Product", 10);
    await repo.create(product);

    const usecase = new FindProductUseCase(repo);
    const result = await usecase.execute({ id: "1" });

    expect(result.name).toBe("Product");
  });
});

