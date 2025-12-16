import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";

export class ProductRepositoryMemory implements ProductRepositoryInterface {
  products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex(p => p.id === product.id);
    this.products[index] = product;
  }

  async find(id: string): Promise<Product> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }
}
