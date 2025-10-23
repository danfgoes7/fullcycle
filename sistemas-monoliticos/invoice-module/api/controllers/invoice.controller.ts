import { Request, Response } from "express";
import InvoiceFacade from "../../src/facade/invoice.facade";

export default class InvoiceController {
  static async getInvoice(req: Request, res: Response, facade: InvoiceFacade) {
    const { id } = req.params;

    try {
      const invoice = await facade.find({ id });

      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      res.status(200).json(invoice);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

