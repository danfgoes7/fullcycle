import { Address } from "../value-object/address";
import { InvoiceItem } from "./invoice-item";
import { Id } from "../../@shared/domain/value-object/id.value-object";

export class Invoice {
  public readonly id: Id;
  public readonly name: string;
  public readonly document: string;
  public readonly address: Address;
  public readonly items: InvoiceItem[];
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: {
    id?: string;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItem[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ? new Id(props.id) : new Id();

    if (!props.name) throw new Error("name is required");
    if (!props.document) throw new Error("document is required");
    if (!props.address) throw new Error("address is required");
    if (!props.items || props.items.length === 0)
      throw new Error("invoice must have at least one item");

    this.name = props.name;
    this.document = props.document;
    this.address = props.address;
    this.items = props.items;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  total(): number {
    return this.items.reduce((sum, it) => sum + it.price, 0);
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      document: this.document,
      address: this.address.toJSON(),
      items: this.items.map((i) => i.toJSON()),
      total: this.total(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

