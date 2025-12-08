// src/domain/customer/value-object/address.ts

export default class Address {
  constructor(
    public street: string,
    public number: number,
    public zip: string,
    public city: string
  ) {
    if (!street) throw new Error("Street is required");
    if (!number && number !== 0) throw new Error("Number is required");
    if (!zip) throw new Error("Zip is required");
    if (!city) throw new Error("City is required");
  }

  toString(): string {
    return `${this.street}, ${this.number}, ${this.zip} - ${this.city}`;
  }
}

