import { Invoice } from "../../domain/entity/invoice";

export interface InvoiceRepository {
  generate(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice | null>;
}

