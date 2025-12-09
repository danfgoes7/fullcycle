import { Product } from "../../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface";

export class ProductRepository implements ProductRepositoryInterface {
  private products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id);

    if (index === -1) {
      throw new Error("Product not found");
    }

    this.products[index] = product;
  }

  async find(id: string): Promise<Product> {
    const product = this.products.find(p => p.id === id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }
}
