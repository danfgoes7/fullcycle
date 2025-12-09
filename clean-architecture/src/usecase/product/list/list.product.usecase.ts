import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto,
} from "./list.product.dto";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(_: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };
  }
}
