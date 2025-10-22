import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./dto/find-invoice.dto";
import { InvoiceRepository } from "./ports/invoice-repository.interface";

export class FindInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);
    if (!invoice) throw new Error("Invoice not found");

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((i) => ({
        id: i.id.id,
        name: i.name,
        price: i.price,
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    };
  }
}

