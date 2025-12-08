# Micro-serviços - Wallet Core + Balances (FullCycle EDA)

Este projeto implementa dois microsserviços em Go, utilizando **Kafka** e **MySQL**, para exercitar uma arquitetura baseada em eventos:

- **Wallet Core**  
  - expõe endpoints HTTP para clientes, contas e transações;  
  - ao criar uma transação, publica eventos no Kafka (`TransactionCreated` e `BalanceUpdated`).

- **Balances**  
  - consome eventos de **balance** enviados pelo Wallet Core via Kafka;  
  - persiste os saldos no banco `balances`;  
  - expõe o endpoint `GET /balances/{account_id}` na porta **3003**.

O objetivo do desafio é garantir o entendimento da **produção e consumo de eventos entre microsserviços**.

---

## Estrutura do projeto

```text
micro-servicos/
├─ wallet/
│  ├─ cmd/walletcore/main.go     # Serviço principal (Wallet Core)
│  ├─ internal/...               # Domínio, use cases, web, infra, etc.
│  ├─ api/client.http            # Requests auxiliares (dev)
│  └─ Dockerfile
├─ balances/
│  ├─ cmd/balances/main.go       # Serviço principal (Balances)
│  ├─ internal/...               # Domínio, use cases, web, infra, etc.
│  ├─ api/client.http            # Requests auxiliares (dev)
│  └─ Dockerfile
├─ docker-compose.yaml           # Orquestração de todos os serviços
├─ checks.http                   # Fluxo oficial de teste end-to-end
└─ README.md
