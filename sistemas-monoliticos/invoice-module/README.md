# Invoice Module - Full Cycle 3.0

Este módulo implementa o sistema de **Invoice (Nota Fiscal)** para o monolito do curso Full Cycle 3.0.

---

## Estrutura do módulo

```text
src/
├─ domain/
│  ├─ entity/
│  │  ├─ invoice.ts
│  │  └─ invoice-item.ts
│  ├─ factory/
│  │  └─ invoice.factory.ts
│  └─ value-object/
│     └─ address.ts
├─ usecase/
│  ├─ generate-invoice.usecase.ts
│  ├─ find-invoice.usecase.ts
│  ├─ dto/
│  │  ├─ generate-invoice.dto.ts
│  │  └─ find-invoice.dto.ts
│  └─ ports/
│     └─ invoice-repository.interface.ts
├─ infra/
│  └─ repository/
│     └─ invoice.repository.memory.ts
├─ @shared/
│  └─ domain/
│     └─ value-object/
│        └─ id.value-object.ts
├─ facade/
│  └─ invoice.facade.ts
└─ tests/
   └─ invoice.facade.spec.ts

---

## Funcionalidades

- **Gerar Invoice** (`GenerateInvoiceUseCase`)
- **Buscar Invoice** (`FindInvoiceUseCase`)
- **Persistência em memória** (via `InMemoryInvoiceRepository`)
- **Facade** para integração dos use cases
- **Testes automatizados** cobrindo casos de uso

---

## Fluxo do Invoice

[Cliente/Facade] 
      │
      ▼
[GenerateInvoiceUseCase] --recebe--> DTO de entrada
      │
      ▼
[InvoiceFactory] --cria--> Invoice + InvoiceItems + Address
      │
      ▼
[InMemoryInvoiceRepository] --persiste--> Lista de Invoices
      │
      ▼
[Output DTO] --> retorna ID, total, e dados completos

[FindInvoiceUseCase] --recebe--> ID da Invoice
      │
      ▼
[InMemoryInvoiceRepository] --busca--> Invoice
      │
      ▼
[Output DTO] --> retorna dados completos da Invoice


## Como rodar os testes

npm install
npm test

## Estrutura de dados

Invoice:

id: string (gerado automaticamente)

name: string

document: string

address: Address (Value Object)

items: InvoiceItem[]

createdAt: Date

updatedAt: Date

InvoiceItem:

id: string (gerado automaticamente)

name: string

price: number

DTOs:

GenerateInvoiceUseCaseInputDto / GenerateInvoiceUseCaseOutputDto

FindInvoiceUseCaseInputDTO / FindInvoiceUseCaseOutputDTO

