import { Request, Response } from "express";
import { InMemoryProductRepository, Product } from "../repository/in-memory-product.repository";

const repo = new InMemoryProductRepository();

export default class ProductController {
  static async create(req: Request, res: Response) {
    const { name, price } = req.body;
    const product: Product = { id: `prod-${Date.now()}`, name, price };
    await repo.create(product);
    res.status(201).json(product);
  }
}

