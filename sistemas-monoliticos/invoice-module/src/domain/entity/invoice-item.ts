import { Id } from "../../@shared/domain/value-object/id.value-object";

export class InvoiceItem {
  public readonly id: Id;
  public readonly name: string;
  public readonly price: number;

  constructor(id?: string, name?: string, price?: number) {
    if (!name) throw new Error("name is required");
    if (price === undefined || price < 0) throw new Error("price is required and must be >= 0");

    this.id = new Id(id);
    this.name = name;
    this.price = price;
  }

  toJSON() {
    return {
      id: this.id.id,
      name: this.name,
      price: this.price,
    };
  }
}

