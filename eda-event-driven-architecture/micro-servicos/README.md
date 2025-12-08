# Micro-serviços - Wallet Core + Balances (FullCycle EDA)

Este projeto implementa dois microsserviços em Go, utilizando **Kafka** e **MySQL**, para exercitar arquitetura **event-driven**:

- **Wallet Core**  
  - expõe endpoints HTTP para clientes, contas e transações;
  - ao criar uma transação, publica um evento no Kafka.

- **Balances**  
  - consome eventos de balance enviados pelo Wallet Core via Kafka;
  - persiste os saldos no banco `balances`;
  - expõe o endpoint `GET /balances/{account_id}` na porta **3003**.

O objetivo do desafio é garantir que você entendeu na prática a **produção e consumo de eventos** entre microsserviços.

---

## Estrutura

```text
micro-servicos/
├─ wallet/
│  ├─ cmd/walletcore/main.go     # serviço principal (Wallet Core)
│  ├─ api/client.http            # requests auxiliares de desenvolvimento
│  └─ Dockerfile
├─ balances/
│  ├─ cmd/balances/main.go       # serviço principal (Balances)
│  ├─ api/client.http            # requests auxiliares de desenvolvimento
│  └─ Dockerfile
├─ docker-compose.yaml           # orquestração de todos os serviços
├─ checks.http                   # fluxo de teste end-to-end (entrega)
└─ README.md

