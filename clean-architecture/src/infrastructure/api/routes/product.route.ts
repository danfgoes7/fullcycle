import express, { Request, Response } from "express";
import { ProductRepositorySequelize } from "../../product/repository/sequelize/product.repository";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepositorySequelize();
    const listUseCase = new ListProductUseCase(productRepository);

    const output = await listUseCase.execute({});

    // Aqui, vamos devolver exatamente o DTO: { products: [...] }
    res.status(200).json(output);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
