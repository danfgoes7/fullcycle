// src/domain/checkout/entity/order.ts

import OrderItem from "./order_item";

export default class Order {
  constructor(
    public readonly id: string,
    public customerId: string,
    public items: OrderItem[]
  ) {
    if (!id) throw new Error("Id is required");
    if (!customerId) throw new Error("CustomerId is required");
    if (!items || items.length === 0)
      throw new Error("Order must have at least one item");
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + item.total(), 0);
  }
}

