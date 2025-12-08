# Desafio DDD - Modelagem Tática e Domain Events (Full Cycle)

Este projeto implementa os desafios de **Modelagem Tática com DDD** e **Domain Events** do curso Full Cycle.

O objetivo é praticar na prática:
- Repository Pattern
- Domain Events
- Event Handlers
- Testes automatizados com Jest
- DDD na camada de domínio

---

## ✅ Funcionalidades Implementadas

### 🔹 Parte 1 — OrderRepository (Checkout)

Foi implementada a classe `OrderRepository` com todos os métodos definidos pela interface `OrderRepositoryInterface`.

Funcionalidades:
- ✅ Criar pedido
- ✅ Atualizar pedido
- ✅ Buscar pedido por ID
- ✅ Buscar todos os pedidos
- ✅ Lançar erro quando pedido não existe
- ✅ Testes automatizados cobrindo todos os cenários

---

### 🔹 Parte 2 — Domain Events (Customer)

Foram implementados dois eventos de domínio para o agregado `Customer`.

#### ✅ Evento 1 — CustomerCreated
Disparado quando um novo cliente é criado.

Handlers:
- `EnviaConsoleLog1Handler` → Exibe:

Esse é o primeiro console.log do evento: CustomerCreated

- `EnviaConsoleLog2Handler` → Exibe:

Esse é o segundo console.log do evento: CustomerCreated


---

#### ✅ Evento 2 — AddressChanged
Disparado quando o endereço do cliente é alterado via `changeAddress()`.

Handler:
- `EnviaConsoleLogHandler` → Exibe:

Endereço do cliente: {id}, {nome} alterado para: {endereco}


---

## ✅ Estrutura do Projeto


src/
├── domain/
│ ├── checkout/
│ │ ├── entity/
│ │ └── repository/
│ ├── customer/
│ │ ├── entity/
│ │ ├── event/
│ │ └── value-object/
│ └── @shared/
│ └── event/
├── infrastructure/
│ └── order/
│ └── repository/
│ └── sequelize/
├── tests/
└── ...


---

## ✅ Testes

Todos os testes foram implementados com Jest.

Para executar:

```bash
npm install
npm test

Resultado esperado:

PASS  src/infrastructure/order/repository/sequelize/order.repository.spec.ts
PASS  src/domain/customer/event/customer-events.spec.ts

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total

