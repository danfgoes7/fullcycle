// src/facade/invoice.facade.ts

import { InMemoryInvoiceRepository } from '../infra/repository/invoice.repository.memory';
import { GenerateInvoiceUseCase } from '../usecase/generate-invoice.usecase';
import { FindInvoiceUseCase } from '../usecase/find-invoice.usecase';

export class InvoiceFacade {
  public generate: (input: any) => Promise<any>;
  public find: (input: any) => Promise<any>;

  constructor(repository?: any) {
    const repo = repository ?? new InMemoryInvoiceRepository();
    const generateUC = new GenerateInvoiceUseCase(repo);
    const findUC = new FindInvoiceUseCase(repo);
    this.generate = (input) => generateUC.execute(input);
    this.find = (input) => findUC.execute(input);
  }
}
