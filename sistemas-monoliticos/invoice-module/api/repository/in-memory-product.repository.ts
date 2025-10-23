export interface Product {
  id: string;
  name: string;
  price: number;
}

export class InMemoryProductRepository {
  private items: Product[] = [];

  async create(product: Product) {
    this.items.push(product);
    return product;
  }

  async findById(id: string) {
    return this.items.find(p => p.id === id);
  }
}

