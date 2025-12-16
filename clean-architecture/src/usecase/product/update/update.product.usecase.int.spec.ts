import { UpdateProductUseCase } from "./update.product.usecase";
import { ProductRepositoryMemory } from "../__tests__/product.repository.memory";
import { Product } from "../../../domain/product/entity/product";

describe("Update Product — Integration Test", () => {
  it("should update product", async () => {
    const repo = new ProductRepositoryMemory();
    const product = new Product("1", "Old", 10);
    await repo.create(product);

    const usecase = new UpdateProductUseCase(repo);
    await usecase.execute({ id: "1", name: "New", price: 20 });

    const updated = await repo.find("1");
    expect(updated.name).toBe("New");
    expect(updated.price).toBe(20);
  });
});
