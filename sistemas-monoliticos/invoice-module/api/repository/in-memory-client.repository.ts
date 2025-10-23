export interface Client {
  id: string;
  name: string;
  email: string;
}

export class InMemoryClientRepository {
  private items: Client[] = [];

  async create(client: Client) {
    this.items.push(client);
    return client;
  }

  async findById(id: string) {
    return this.items.find(c => c.id === id);
  }
}

