// src/domain/checkout/repository/order-repository.interface.ts

import Order from "../entity/order";

export default interface OrderRepositoryInterface {
  create(entity: Order): Promise<void>;
  update(entity: Order): Promise<void>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
}

