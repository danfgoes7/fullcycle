package main

import (
    "context"
    "database/sql"
    "fmt"

    "github.com.br/devfullcycle/fc-ms-wallet/internal/database"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/event"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/event/handler"
    createaccount "github.com.br/devfullcycle/fc-ms-wallet/internal/usecase/create_account"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/usecase/create_client"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/usecase/create_transaction"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/web"
    "github.com.br/devfullcycle/fc-ms-wallet/internal/web/webserver"
    "github.com.br/devfullcycle/fc-ms-wallet/pkg/events"
    "github.com.br/devfullcycle/fc-ms-wallet/pkg/kafka"
    "github.com.br/devfullcycle/fc-ms-wallet/pkg/uow"
    ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
        "root", "root", "wallet-mysql", "3306", "wallet"))
    if err != nil {
        panic(err)
    }
    defer db.Close()

    // LIMPA AS TABELAS
    db.Exec("DROP TABLE IF EXISTS transactions")
    db.Exec("DROP TABLE IF EXISTS accounts")
    db.Exec("DROP TABLE IF EXISTS clients")

    // CLIENTS
    _, err = db.Exec(`
        CREATE TABLE clients (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            created_at TIMESTAMP
        )
    `)
    if err != nil {
        panic(err)
    }

    // ACCOUNTS
    _, err = db.Exec(`
        CREATE TABLE accounts (
            id VARCHAR(255) PRIMARY KEY,
            client_id VARCHAR(255),
            balance INTEGER,
            created_at TIMESTAMP
        )
    `)
    if err != nil {
        panic(err)
    }

    // TRANSACTIONS
    _, err = db.Exec(`
        CREATE TABLE transactions (
            id VARCHAR(255) PRIMARY KEY,
            account_id_from VARCHAR(255),
            account_id_to VARCHAR(255),
            amount INTEGER,
            created_at TIMESTAMP
        )
    `)
    if err != nil {
        panic(err)
    }

    // INSERT CLIENTS
    _, err = db.Exec(`
        INSERT INTO clients (id, name, email, created_at) VALUES
        ('a2f49c1d-8c52-40ae-9bef-3ad0f9d79ec4','John','john@email.com', NOW()),
        ('7f12e3b9-4d32-44b0-8e1a-5c6e8f0d7230','Jane','jane@email.com', NOW()),
        ('d7c91b7e-2e1a-4f89-8bae-8c3f0f2a481a','Alice','alice@email.com', NOW()),
        ('b1a4cfe3-f982-46f8-9fa3-3458b6e489af','Bob','bob@email.com', NOW()),
        ('c9e2d6fa-02ad-4b1f-8b91-34d3f0921ae2','Charlie','charlie@email.com', NOW()),
        ('85a4d3c7-31d4-4fb3-8aca-707df2e55b98','David','david@email.com', NOW()),
        ('98b76fa4-04c8-4294-b4d1-1f7a732e6cde','Eva','eva@email.com', NOW()),
        ('f3b0d7e8-c12f-4e32-9a17-4cb2827ea567','Frank','frank@email.com', NOW()),
        ('6d981c2b-5aa8-4e90-aab7-9e484c1a9f4d','Grace','grace@email.com', NOW()),
        ('c4f07f15-27ed-4c5e-8d3f-0489d9e8f3ed','Harry','harry@email.com', NOW())
    `)
    if err != nil {
        panic(err)
    }

    // INSERT ACCOUNTS
    _, err = db.Exec(`
        INSERT INTO accounts (id, client_id, balance, created_at) VALUES
        ('7e8c82a1-f330-4a51-9fde-8d0f5be6e9f1','a2f49c1d-8c52-40ae-9bef-3ad0f9d79ec4',1000, NOW()),
        ('9ea3b57e-1b8e-4a1f-a453-2b013e1d7b8f','7f12e3b9-4d32-44b0-8e1a-5c6e8f0d7230',1000, NOW()),
        ('0c4d1f7b-3b34-4461-9b21-76e58f7b6db8','d7c91b7e-2e1a-4f89-8bae-8c3f0f2a481a',1000, NOW()),
        ('ea2b73f4-5d9c-48a3-9c4e-3fee3d2c4b12','b1a4cfe3-f982-46f8-9fa3-3458b6e489af',1000, NOW()),
        ('31f12a6c-9f5b-4a3c-b0f3–cdaa4e1f3bc5','c9e2d6fa-02ad-4b1f-8b91-34d3f0921ae2',1000, NOW()),
        ('ade6c9f0-52e5-4f2d-8d74-cd25e3c6bc72','85a4d3c7-31d4-4fb3-8aca-707df2e55b98',1000, NOW()),
        ('cf08b57d-d3eb-4f18-b4d1-b1f3167c6a2f','98b76fa4-04c8-4294-b4d1-1f7a732e6cde',800, NOW()),
        ('9bcd5f54-8b01-4f3a-a9e0-367f0ab12345','f3b0d7e8-c12f-4e32-9a17-4cb2827ea567',1200, NOW()),
        ('8f1a3e95-4ea1-4f2e-9b79-9523eb0e6a9c','6d981c2b-5aa8-4e90-aab7-9e484c1a9f4d',1000, NOW()),
        ('b153a0d4-c0de-4f11-a874-7e831c9e6441','c4f07f15-27ed-4c5e-8d3f-0489d9e8f3ed',1000, NOW())
    `)
    if err != nil {
        panic(err)
    }

    // INSERT TRANSACTIONS
    _, err = db.Exec(`
        INSERT INTO transactions (id, account_id_from, account_id_to, amount, created_at) VALUES
        ('3f8a2b51-6578-4e8d-bf31-2b4c1f5fa46f','7e8c82a1-f330-4a51-9fde-8d0f5be6e9f1','9ea3b57e-1b8e-4a1f-a453-2b013e1d7b8f',100, NOW()),
        ('27c6d4a9-cf55-469e-915a-6e49d3d400ce','0c4d1f7b-3b34-4461-9b21-76e58f7b6db8','ea2b73f4-5d9c-48a3-9c4e-3fee3d2c4b12',100, NOW()),
        ('14d4e97b-e4fa-46e3-b3b9-0f79d5e8912f','31f12a6c-9f5b-4a3c-b0f3–cdaa4e1f3bc5','ade6c9f0-52e5-4f2d-8d74-cd25e3c6bc72',100, NOW()),
        ('b9f3e841-6416-4f0b-8eab-3875a7e6c9d8','cf08b57d-d3eb-4f18-b4d1-b1f3167c6a2f','9bcd5f54-8b01-4f3a-a9e0-367f0ab12345',100, NOW()),
        ('d2c5ea69-0a3e-4f9e-9b7a-6e2de4a8f3f1','8f1a3e95-4ea1-4f2e-9b79-9523eb0e6a9c','b153a0d4-c0de-4f11-a874-7e831c9e6441',100, NOW())
    `)
    if err != nil {
        panic(err)
    }

    // KAFKA
    configMap := ckafka.ConfigMap{
        "bootstrap.servers": "kafka:29092",
        "group.id":          "wallet",
    }
    kafkaProducer := kafka.NewKafkaProducer(&configMap)

    eventDispatcher := events.NewEventDispatcher()
    eventDispatcher.Register("TransactionCreated", handler.NewTransactionCreatedKafkaHandler(kafkaProducer))
    eventDispatcher.Register("BalanceUpdated", handler.NewUpdateBalanceKafkaHandler(kafkaProducer))

    transactionCreatedEvent := event.NewTransactionCreated()
    balanceUpdatedEvent := event.NewBalanceUpdated()

    clientDb := database.NewClientDB(db)
    accountDb := database.NewAccountDB(db)

    ctx := context.Background()
    uow := uow.NewUow(ctx, db)

    uow.Register("AccountDB", func(tx *sql.Tx) interface{} {
        return database.NewAccountDB(db)
    })
    uow.Register("TransactionDB", func(tx *sql.Tx) interface{} {
        return database.NewTransactionDB(db)
    })

    createTransactionUseCase := create_transaction.NewCreateTransactionUseCase(
        uow, eventDispatcher, transactionCreatedEvent, balanceUpdatedEvent,
    )
    createClientUseCase := create_client.NewCreateClientUseCase(clientDb)
    createAccountUseCase := createaccount.NewCreateAccountUseCase(accountDb, clientDb)

    // SERVER
    webserver := webserver.NewWebServer(":8080")

    clientHandler := web.NewWebClientHandler(*createClientUseCase)
    accountHandler := web.NewWebAccountHandler(*createAccountUseCase)
    transactionHandler := web.NewWebTransactionHandler(*createTransactionUseCase)

    webserver.AddHandler("/clients", clientHandler.CreateClient)
    webserver.AddHandler("/accounts", accountHandler.CreateAccount)
    webserver.AddHandler("/transactions", transactionHandler.CreateTransaction)

    fmt.Println("Server is running at port 8080")
    webserver.Start()
}

