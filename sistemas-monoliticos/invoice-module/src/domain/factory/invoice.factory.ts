import { Invoice } from "../entity/invoice";
import { InvoiceItem } from "../entity/invoice-item";
import { Address } from "../value-object/address";
import { Id } from "../../@shared/domain/value-object/id.value-object";

export class InvoiceFactory {
  static create(input: {
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id?: string;
      name: string;
      price: number;
    }[];
  }): Invoice {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.complement,
      input.address.city,
      input.address.state,
      input.address.zipCode
    );

    const items = input.items.map(
      (i) => new InvoiceItem(i.id, i.name, i.price)
    );

    return new Invoice({
      id: new Id().id,
      name: input.name,
      document: input.document,
      address,
      items,
    });
  }
}

