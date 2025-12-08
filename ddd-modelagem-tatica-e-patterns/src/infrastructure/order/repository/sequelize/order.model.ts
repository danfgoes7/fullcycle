// src/infrastructure/order/repository/sequelize/order.model.ts

import {
  Table,
  Model,
  PrimaryKey,
  Column,
  HasMany,
} from "sequelize-typescript";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare customer_id: string;

  @Column
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}

