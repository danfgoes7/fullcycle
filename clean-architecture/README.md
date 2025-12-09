# Desafio Clean Architecture – Products (Full Cycle 3.0)

Este projeto implementa o desafio de **Clean Architecture aplicado à entidade Product**, conforme proposto no curso **Full Cycle 3.0**.

O objetivo principal foi aplicar corretamente os conceitos de:

- Clean Architecture
- Use Cases
- Repository Pattern
- Notification Pattern
- Validação desacoplada com Validator
- Testes de Unidade
- Testes End-to-End (API)

---

## ✅ Enunciados Implementados

### ✅ Parte 1 — Use Cases de Product

Foram implementadas as operações completas para a entidade **Product**:

- ✅ Criar Produto (`create`)
- ✅ Buscar Produto por ID (`find`)
- ✅ Listar Produtos (`list`)
- ✅ Atualizar Produto (`update`)

Também foram criados **testes unitários para todos os casos de uso**.

---

### ✅ Parte 2 — API de Listagem de Products (E2E)

Foi criada uma API Express com rota:

GET /products


Com:
- Integração com Sequelize
- Banco SQLite em memória para testes
- Teste automatizado **end-to-end com Supertest**

---

### ✅ Parte 3 — Notification Pattern no Product

Foi aplicado o **Notification Pattern** na entidade `Product` para acumular erros de validação.

Foram criados testes automatizados garantindo:

- ✅ Acúmulo de múltiplos erros
- ✅ Lançamento do `NotificationError`
- ✅ Mensagens de erro concatenadas corretamente

---

### ✅ Parte 4 — Validação Desacoplada com Validator

A validação da entidade `Product` foi desacoplada através da classe:

ProductValidator


Assim, a entidade ficou responsável apenas por delegar o processo de validação, reduzindo o acoplamento.

Todos os testes continuam passando após essa alteração ✅

---

## ✅ Estrutura do Projeto

src/
├── domain/
│ └── product/
│ ├── entity/
│ │ └── product.ts
│ ├── repository/
│ │ └── product-repository.interface.ts
│ └── validator/
│ └── product.validator.ts
│
├── usecase/
│ └── product/
│ ├── create/
│ ├── find/
│ ├── list/
│ └── update/
│
├── infrastructure/
│ ├── api/
│ └── product/
│ └── repository/
│ └── sequelize/
│
└── @shared/
└── notification/
├── notification.ts
└── notification.error.ts


---

## ✅ Testes Implementados

- ✅ Testes unitários da entidade `Product`
- ✅ Testes unitários dos 4 Use Cases:
  - Create
  - Find
  - List
  - Update
- ✅ Teste End-to-End da rota `GET /products`
- ✅ Testes do Notification Pattern com múltiplos erros

---

## ✅ Resultado Final dos Testes

Test Suites: 6 passed, 6 total
Tests: 13 passed, 13 total
Snapshots: 0 total


---

## ✅ Como executar o projeto

### 1️⃣ Instalar dependências
```bash
npm install

2️⃣ Executar os testes

npm test

