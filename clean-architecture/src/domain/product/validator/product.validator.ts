import type { Product } from "../entity/product";

export default class ProductValidator {
  validate(product: Product): void {
    if (!product.id || product.id.trim().length === 0) {
      product.notification.addError({
        context: "product",
        message: "Id is required",
      });
    }

    if (!product.name || product.name.trim().length === 0) {
      product.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }

    if (product.price <= 0) {
      product.notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
    }
  }
}
