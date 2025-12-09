import { Product } from "../../../../src/domain/product/entity/product";
import { ProductRepository } from "../../../../src/infrastructure/product/repository/memory/product.repository";
import { ListProductUseCase } from "../../../../src/usecase/product/list/list.product.usecase";

describe("ListProductUseCase unit test", () => {
  it("should list all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe("1");
    expect(output.products[0].name).toBe("Product 1");
    expect(output.products[0].price).toBe(100);

    expect(output.products[1].id).toBe("2");
    expect(output.products[1].name).toBe("Product 2");
    expect(output.products[1].price).toBe(200);
  });
});
