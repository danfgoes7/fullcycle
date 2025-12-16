# Desafio Clean Architecture – Products (Full Cycle 3.0)

Este projeto implementa o desafio de **Clean Architecture aplicado à entidade Product**, conforme proposto no curso **Full Cycle 3.0**.

O foco principal foi aplicar corretamente os conceitos de arquitetura limpa, domínio rico e testes automatizados, seguindo rigorosamente os enunciados e feedbacks do instrutor.

---

## 🎯 Objetivos do Desafio

- Aplicar **Clean Architecture**
- Implementar **Use Cases**
- Utilizar **Repository Pattern**
- Aplicar **Notification Pattern**
- Realizar **validação desacoplada**
- Implementar **testes unitários, de integração e end-to-end**

---

## ✅ Enunciados Implementados

### ✅ Parte 1 — Use Cases da Entidade Product

Foram implementadas as seguintes operações para a entidade **Product**:

- ✅ Criar Produto (`create`)
- ✅ Buscar Produto por ID (`find`)
- ✅ Listar Produtos (`list`)
- ✅ Atualizar Produto (`update`)

Para **cada use case**, foram criados:

- ✅ Testes de **unidade**
- ✅ Testes de **integração**
- 📌 Os testes ficam **na mesma pasta do arquivo que está sendo testado**, conforme solicitado no feedback do instrutor.

---

### ✅ Parte 2 — API de Listagem de Products (E2E)

Foi criada uma API HTTP para listagem de produtos:

GET /products


Características:
- Integração com **Sequelize**
- Banco **SQLite em memória** para testes
- Teste **end-to-end automatizado** utilizando **Supertest**

---

### ✅ Parte 3 — Notification Pattern aplicado ao Product

Foi aplicado o **Notification Pattern** na entidade `Product`, permitindo:

- Acúmulo de múltiplos erros de validação
- Retorno de todos os erros de uma única vez
- Redução do uso excessivo de exceções

Foram criados testes automatizados garantindo:
- ✅ Acúmulo de dois ou mais erros simultaneamente
- ✅ Lançamento do `NotificationError`
- ✅ Mensagens de erro corretamente agregadas

---

### ✅ Parte 4 — Validação Desacoplada com Validator

A validação da entidade `Product` foi desacoplada utilizando a classe:

ProductValidator


Dessa forma:
- A entidade `Product` não contém regras de validação
- O domínio fica menos acoplado
- O processo segue rigorosamente os princípios de **Clean Architecture**

Todos os testes continuaram passando após essa alteração ✅

---

## 📁 Estrutura Final do Projeto

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
│ │ ├── create.product.usecase.ts
│ │ ├── create.product.dto.ts
│ │ ├── create.product.usecase.spec.ts
│ │ └── create.product.usecase.int.spec.ts
│ ├── find/
│ │ ├── find.product.usecase.ts
│ │ ├── find.product.dto.ts
│ │ ├── find.product.usecase.spec.ts
│ │ └── find.product.usecase.int.spec.ts
│ ├── list/
│ │ ├── list.product.usecase.ts
│ │ ├── list.product.dto.ts
│ │ ├── list.product.usecase.spec.ts
│ │ └── list.product.usecase.int.spec.ts
│ ├── update/
│ │ ├── update.product.usecase.ts
│ │ ├── update.product.dto.ts
│ │ ├── update.product.usecase.spec.ts
│ │ └── update.product.usecase.int.spec.ts
│ └── tests/
│ └── product.repository.memory.ts
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

## 🧪 Testes Implementados

- ✅ Testes unitários da entidade `Product`
- ✅ Testes unitários e de integração para **todos os use cases**
- ✅ Teste end-to-end da rota `GET /products`
- ✅ Testes do Notification Pattern com múltiplos erros

---

## 🟢 Resultado Final dos Testes

Test Suites: 10 passed, 10 total
Tests: 17 passed, 17 total
Snapshots: 0 total


---

## ▶️ Como Executar o Projeto

### 1️⃣ Instalar dependências
```bash
npm install

2️⃣ Executar os testes

npm test
