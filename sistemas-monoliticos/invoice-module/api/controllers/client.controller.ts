import { Request, Response } from "express";
import { InMemoryClientRepository, Client } from "../repository/in-memory-client.repository";

const repo = new InMemoryClientRepository();

export default class ClientController {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body;
    const client: Client = { id: `client-${Date.now()}`, name, email };
    await repo.create(client);
    res.status(201).json(client);
  }
}

