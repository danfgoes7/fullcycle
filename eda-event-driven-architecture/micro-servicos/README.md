# 🚀 Microsserviços — Wallet Core + Balances (Event-Driven Architecture)

Este projeto faz parte do desafio de **Event-Driven Architecture** do curso **Full Cycle**.  
O objetivo é criar dois microsserviços que se comunicam via **Kafka**, onde:

- O serviço **Wallet Core** processa *clients*, *accounts* e *transactions*.
- Cada *transaction* gera um **evento Kafka**.
- O serviço **Balances** consome esse evento e grava o **saldo atualizado** por conta.
- O serviço **Balances** deve disponibilizar:
GET /balances/{account_id}

markdown
Copiar código

Tudo deve rodar com **um único comando**:

docker compose up --build -d

yaml
Copiar código

---

# 📌 Estrutura dos Serviços

## 🟦 Wallet Core (porta 8080)

Responsável por:

- Criar *clients*
- Criar *accounts*
- Registrar *transactions*
- Publicar eventos no Kafka no tópico **balances**

Ao iniciar:

docker compose exec wallet-app bash
go run cmd/walletcore/main.go

yaml
Copiar código

---

## 🟩 Balances (porta 3003)

Responsável por:

- Consumir eventos do tópico **balances**
- Criar/atualizar o saldo por account_id
- Expor o endpoint:
GET /balances/{account_id}

yaml
Copiar código

Ao iniciar:

docker compose exec balances-app bash
go run cmd/balances/main.go

yaml
Copiar código

---

# 🗄️ Banco de Dados

Ambos serviços rodam MySQL em containers separados:

| Serviço   | Banco          | Porta |
|-----------|----------------|-------|
| Wallet    | wallet-mysql   | 3306  |
| Balances  | balances-mysql | 3307  |

Migrations e *seed* são executados automaticamente na inicialização de cada serviço.

---

# 📬 Endpoints HTTP (*via .http ou curl*)

## Wallet Core
Arquivo: `wallet/api/client.http`

- POST /clients  
- POST /accounts  
- POST /transactions  

## Balances
Arquivo: `balances/api/client.http`

- GET /balances/{account_id}

---

# 🔄 Fluxo do Evento

1. O Wallet recebe uma transaction.
2. Ele calcula o novo saldo das contas:
   - account_from
   - account_to
3. Publica evento no Kafka no formato:

```json
{
  "Name": "BalanceUpdated",
  "Payload": {
    "account_id_from": "",
    "account_id_to": "",
    "balance_account_id_from": "",
    "balance_account_id_to": ""
  }
}
O Balance Service consome o evento e cria os registros no banco.

▶️ Execução Completa
1. Subir tudo
css
Copiar código
docker compose up --build -d
2. Entrar no Wallet
bash
Copiar código
docker compose exec wallet-app bash
go run cmd/walletcore/main.go
3. Entrar no Balances
bash
Copiar código
docker compose exec balances-app bash
go run cmd/balances/main.go
📌 Testando
Criar client → account → transaction
Use os arquivos .http ou os comandos curl no README.

Consultar saldo atualizado da conta:
bash
Copiar código
GET http://localhost:3003/balances/{account_id}
✔️ Requisitos Atendidos
 Rodar tudo via docker-compose

 Kafka funcionando

 Migrations automáticas

 Seeds automáticos

 Wallet Core funcional (clients, accounts, transactions)

 Evento Kafka publicado

 Balances consumindo e persistindo

 Endpoint /balances/{account_id}

 Arquivos .http atualizados

 Porta 3003 no serviço de balances


