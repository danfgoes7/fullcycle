import { Request, Response } from "express";
import InvoiceFacade from "../../src/facade/invoice.facade";

export default class CheckoutController {
  static async processCheckout(req: Request, res: Response, facade: InvoiceFacade) {
    const { name, document, street, number, complement, city, state, zipCode, items } = req.body;

    try {
      const invoice = await facade.generate({
        name,
        document,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
        items,
      });

      res.status(201).json(invoice);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

