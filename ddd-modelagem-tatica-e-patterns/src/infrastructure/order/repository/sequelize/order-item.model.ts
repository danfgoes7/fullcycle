// src/infrastructure/order/repository/sequelize/order-item.model.ts

import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare name: string;

  @Column
  declare price: number;

  @Column
  declare quantity: number;

  @Column
  declare product_id: string;

  @ForeignKey(() => OrderModel)
  @Column
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;
}

