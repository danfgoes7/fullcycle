import { ListProductUseCase } from "./list.product.usecase";
import { ProductRepositoryMemory } from "../__tests__/product.repository.memory";
import { Product } from "../../../domain/product/entity/product";

describe("List Product — Integration Test", () => {
  it("should list products", async () => {
    const repo = new ProductRepositoryMemory();
    await repo.create(new Product("1", "P1", 10));
    await repo.create(new Product("2", "P2", 20));

    const usecase = new ListProductUseCase(repo);
    const result = await usecase.execute({});

    expect(result.products.length).toBe(2);
  });
});
