// src/domain/customer/entity/customer.ts

import Address from "../value-object/address";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import { eventDispatcher } from "../../@shared/event/event-dispatcher";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;

  constructor(id: string, name: string) {
    if (!id) throw new Error("Id is required");
    if (!name) throw new Error("Name is required");

    this._id = id;
    this._name = name;

    // Dispara evento de domínio CustomerCreated
    const event = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
    });

    eventDispatcher.notify(event);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address | undefined {
    return this._address;
  }

  changeAddress(address: Address): void {
    this._address = address;

    const event = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
      },
    });

    eventDispatcher.notify(event);
  }
}

