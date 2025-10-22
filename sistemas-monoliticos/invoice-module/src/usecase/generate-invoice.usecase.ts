import { InvoiceFactory } from "../domain/factory/invoice.factory";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./dto/generate-invoice.dto";
import { InvoiceRepository } from "./ports/invoice-repository.interface";

export class GenerateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = InvoiceFactory.create({
      name: input.name,
      document: input.document,
      address: {
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      },
      items: input.items,
    });

    await this.invoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((i) => ({
        id: i.id.id,
        name: i.name,
        price: i.price,
      })),
      total: invoice.total(),
    };
  }
}

