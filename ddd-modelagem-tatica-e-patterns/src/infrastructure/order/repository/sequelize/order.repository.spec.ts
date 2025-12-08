// src/infrastructure/order/repository/sequelize/order.repository.spec.ts

import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, OrderItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
    const order = new Order("o1", "c1", [item1]);

    const repository = new OrderRepository();
    await repository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "o1" },
      include: [OrderItemModel],
    });

    // garante para o TS e para o teste que não é null
    expect(orderModel).not.toBeNull();

    expect(orderModel!.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: "c1",
      total: 20,
      items: [
        {
          id: "i1",
          name: "Item 1",
          price: 10,
          quantity: 2,
          product_id: "p1",
          order_id: "o1",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
    const order = new Order("o1", "c1", [item1]);

    const repository = new OrderRepository();
    await repository.create(order);

    // altera a ordem: troca itens
    const item2 = new OrderItem("i2", "Item 2", 5, "p2", 3);
    order.items = [item2];

    await repository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "o1" },
      include: [OrderItemModel],
    });

    expect(orderModel).not.toBeNull();

    expect(orderModel!.total).toBe(15); // 5 * 3
    expect(orderModel!.items.length).toBe(1);
    expect(orderModel!.items[0].id).toBe("i2");
    expect(orderModel!.items[0].product_id).toBe("p2");
  });

  it("should find an order", async () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
    const order = new Order("o1", "c1", [item1]);

    const repository = new OrderRepository();
    await repository.create(order);

    const foundOrder = await repository.find("o1");

    expect(foundOrder.id).toBe("o1");
    expect(foundOrder.customerId).toBe("c1");
    expect(foundOrder.items.length).toBe(1);
    expect(foundOrder.items[0].id).toBe("i1");
  });

  it("should throw error when order is not found", async () => {
    const repository = new OrderRepository();
    await expect(repository.find("non-existent")).rejects.toThrow(
      "Order not found"
    );
  });

  it("should find all orders", async () => {
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 5, "p2", 3);

    const order1 = new Order("o1", "c1", [item1]);
    const order2 = new Order("o2", "c2", [item2]);

    const repository = new OrderRepository();
    await repository.create(order1);
    await repository.create(order2);

    const orders = await repository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe("o1");
    expect(orders[1].id).toBe("o2");
  });
});

