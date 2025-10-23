// src/facade/invoice.facade.ts

import { InMemoryInvoiceRepository } from '../infra/repository/invoice.repository.memory';
import { GenerateInvoiceUseCase } from '../usecase/generate-invoice.usecase';
import { FindInvoiceUseCase } from '../usecase/find-invoice.usecase';
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from '../usecase/dto/generate-invoice.dto';
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from '../usecase/dto/find-invoice.dto';

export default class InvoiceFacade {
  private generateUseCase: GenerateInvoiceUseCase;
  private findUseCase: FindInvoiceUseCase;

  constructor(repository?: any) {
    const repo = repository ?? new InMemoryInvoiceRepository();
    this.generateUseCase = new GenerateInvoiceUseCase(repo);
    this.findUseCase = new FindInvoiceUseCase(repo);
  }

  async generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    return this.generateUseCase.execute(input);
  }

  async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    return this.findUseCase.execute(input);
  }
}

