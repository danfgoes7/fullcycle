import { InvoiceRepository } from "../../usecase/ports/invoice-repository.interface";
import { Invoice } from "../../domain/entity/invoice";

export class InMemoryInvoiceRepository implements InvoiceRepository {
  private invoices: Invoice[] = [];

  async generate(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice);
  }

  async find(id: string): Promise<Invoice | null> {
    return this.invoices.find((inv) => inv.id.id === id) || null;
  }
}

