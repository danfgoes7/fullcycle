# Invoice Module - Full Cycle 3.0

Este módulo implementa o sistema de **Invoice (Nota Fiscal)** para o monolito do curso Full Cycle 3.0.

---

## Estrutura do módulo

```text
invoice-module/
├─ api/
│ ├─ app.ts # Configuração do Express
│ └─ controllers/
│ ├─ checkout.controller.ts
│ ├─ clients.controller.ts
│ └─ products.controller.ts
├─ src/
│ ├─ domain/ # Entidades, Value Objects e Factories
│ │ ├─ entity/
│ │ │ ├─ invoice.ts
│ │ │ └─ invoice-item.ts
│ │ ├─ factory/
│ │ │ └─ invoice.factory.ts
│ │ └─ value-object/
│ │ └─ address.ts
│ ├─ usecase/ # Use Cases
│ │ ├─ generate-invoice.usecase.ts
│ │ ├─ find-invoice.usecase.ts
│ │ ├─ dto/
│ │ │ ├─ generate-invoice.dto.ts
│ │ │ └─ find-invoice.dto.ts
│ │ └─ ports/
│ │ └─ invoice-repository.interface.ts
│ ├─ facade/ # Facade do Invoice
│ │ └─ invoice.facade.ts
│ ├─ infra/ # Repository em memória
│ │ └─ repository/
│ │ └─ invoice.repository.memory.ts
│ └─ @shared/ # Value Objects compartilhados
│ └─ domain/
│ └─ value-object/
│ └─ id.value-object.ts
├─ tests/ # Testes unitários do módulo Invoice
├─ api/tests/ # Testes E2E da API
├─ package.json
├─ tsconfig.json
└─ README.md
---


---

## Funcionalidades do módulo Invoice

- **Gerar Invoice** (`GenerateInvoiceUseCase`)  
- **Buscar Invoice** (`FindInvoiceUseCase`)  
- **Persistência em memória** (via `InMemoryInvoiceRepository`)  
- **Facade** para integração dos use cases  

---

## Endpoints da API

### 1. Criar Produto
**POST** `/products`

**Request Body:**
```json
{
  "name": "Produto Teste",
  "price": 100
}

---

Response:

- 201 Created

{
  "id": "prod-1",
  "name": "Produto Teste",
  "price": 100
}

2. Criar Cliente

POST /clients

Request Body:

{
  "name": "Cliente Teste",
  "email": "teste@email.com"
}

Response:

- 201 Created

{
  "id": "client-1",
  "name": "Cliente Teste",
  "email": "teste@email.com"
}

3. Processar Checkout / Gerar Invoice

POST /checkout/

Request Body:

{
  "name": "Cliente Teste",
  "document": "123456789",
  "street": "Rua A",
  "number": "123",
  "complement": "Apto 1",
  "city": "Cidade X",
  "state": "SP",
  "zipCode": "00000-000",
  "items": [
    {
      "id": "prod-1",
      "name": "Produto Teste",
      "price": 100
    }
  ]
}

Response:

- 201 Created

{
  "id": "invoice-1",
  "name": "Cliente Teste",
  "document": "123456789",
  "street": "Rua A",
  "number": "123",
  "complement": "Apto 1",
  "city": "Cidade X",
  "state": "SP",
  "zipCode": "00000-000",
  "items": [
    {
      "id": "prod-1",
      "name": "Produto Teste",
      "price": 100
    }
  ],
  "total": 100
}


4. Buscar Invoice

GET /invoice/:id

Response:

- 200 OK

{
  "id": "invoice-1",
  "name": "Cliente Teste",
  "document": "123456789",
  "address": {
    "street": "Rua A",
    "number": "123",
    "complement": "Apto 1",
    "city": "Cidade X",
    "state": "SP",
    "zipCode": "00000-000"
  },
  "items": [
    {
      "id": "prod-1",
      "name": "Produto Teste",
      "price": 100
    }
  ],
  "total": 100,
  "createdAt": "2025-10-22T12:00:00.000Z"
}

404 Not Found se o invoice não existir.

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


Como rodar o projeto

1 - Instalar dependências:

npm install

2- Rodar testes unitários e E2E:

npm test

3 - Rodar a API localmente:

npx ts-node api/app.ts

Testes

Unitários: Cobrem a lógica do módulo Invoice (tests/).

E2E: Cobrem todos os endpoints da API (api/tests/).

Todos os testes devem passar ao rodar npm test.

Tecnologias

TypeScript

Node.js + Express

Jest + Supertest (testes unitários e E2E)

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

