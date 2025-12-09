import Notification from "../../@shared/notification/notification";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidator from "../validator/product.validator";

export class Product {
  public id: string;
  public name: string;
  public price: number;
  public notification: Notification;

  constructor(id: string, name: string, price: number) {
    this.notification = new Notification();
    this.id = id;
    this.name = name;
    this.price = price;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): void {
    const validator = new ProductValidator();
    validator.validate(this);
  }

  changeName(name: string): void {
    this.name = name;
    // Se quiser revalidar após mudança:
    // this.validate();
    // if (this.notification.hasErrors()) { ... }
  }

  changePrice(price: number): void {
    this.price = price;
    // Mesmo comentário acima sobre revalidação
  }
}
