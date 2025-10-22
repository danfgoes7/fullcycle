export class Address {
  constructor(
    public readonly street: string,
    public readonly number: string,
    public readonly complement: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string
  ) {}

  toJSON() {
    return {
      street: this.street,
      number: this.number,
      complement: this.complement,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
    };
  }
}

