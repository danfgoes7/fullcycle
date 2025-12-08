// src/domain/checkout/entity/order_item.ts

export default class OrderItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly productId: string,
    public quantity: number
  ) {
    if (!id) throw new Error("Id is required");
    if (!name) throw new Error("Name is required");
    if (price <= 0) throw new Error("Price must be greater than 0");
    if (!productId) throw new Error("ProductId is required");
    if (quantity <= 0) throw new Error("Quantity must be greater than 0");
  }

  total(): number {
    return this.price * this.quantity;
  }
}

