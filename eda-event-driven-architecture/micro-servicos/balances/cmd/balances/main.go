package main

import (
    "database/sql"
    "encoding/json"
    "fmt"

    "github.com.br/devfullcycle/fc-ms-balances/internal/database"
    "github.com.br/devfullcycle/fc-ms-balances/internal/usecase/create_balance"
    "github.com.br/devfullcycle/fc-ms-balances/internal/usecase/find_account"
    "github.com.br/devfullcycle/fc-ms-balances/internal/web"
    "github.com.br/devfullcycle/fc-ms-balances/internal/web/webserver"
    "github.com/confluentinc/confluent-kafka-go/kafka"
    _ "github.com/go-sql-driver/mysql"
)

type BalanceEvent struct {
    Name    string      `json:"Name"`
    Payload BalanceData `json:"Payload"`
}

type BalanceData struct {
    AccountIDFrom      string  `json:"account_id_from"`
    AccountIDTo        string  `json:"account_id_to"`
    BalanceAccountFrom float64 `json:"balance_account_id_from"`
    BalanceAccountTo   float64 `json:"balance_account_id_to"`
}

func main() {
    db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local",
        "root", "root", "balances-mysql", "3306", "balances"))
    if err != nil {
        panic(err)
    }
    defer db.Close()

    // TABLE
    _, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS balances (
            id VARCHAR(255),
            account_id VARCHAR(255),
            balance INTEGER,
            created_at TIMESTAMP
        )
    `)
    if err != nil {
        panic(err)
    }

    // INSERT INITIAL BALANCES
    _, err = db.Exec(`
        INSERT INTO balances (id, account_id, balance, created_at) VALUES
        ('55b0d2f4-3e03-4f8f-9e7f-6d51d9a3f42a','7e8c82a1-f330-4a51-9fde-8d0f5be6e9f1',850, NOW()),
        ('1a2e7c9b-6b4e-4cc0-bf1d-9f223e5fb79f','9ea3b57e-1b8e-4a1f-a453-2b013e1d7b8f',1150, NOW()),
        ('8d3f1e2c-9a5b-4992-a9a8-1fdc3426c5af','7e8c82a1-f330-4a51-9fde-8d0f5be6e9f1',800, NOW()),
        ('0c4f1c6d-d7e2-4d8c-b4be-3a7a2b1f8e4e','9ea3b57e-1b8e-4a1f-a453-2b013e1d7b8f',1200, NOW())
    `)
    if err != nil {
        panic(err)
    }

    balanceDb := database.NewBalanceDB(db)

    createBalanceUseCase := create_balance.NewCreateBalanceUseCase(balanceDb)
    findAccountUseCase := find_account.NewFindAccountUseCase(balanceDb)

    // API
    go func() {
        webserver := webserver.NewWebServer(":3003")
        accountHandler := web.NewWebBalanceHandler(*findAccountUseCase)
        webserver.AddHandler("/balances/{account_id}", accountHandler.FindAccount)
        fmt.Println("Server running at port 3003")
        webserver.Start()
    }()

    // KAFKA
    configMap := &kafka.ConfigMap{
        "bootstrap.servers": "kafka:29092",
        "client.id":         "balances",
        "group.id":          "balances",
        "auto.offset.reset": "earliest",
        "enable.auto.commit": true,
    }

    c, err := kafka.NewConsumer(configMap)
    if err != nil {
        fmt.Println("error consumer:", err.Error())
    }

    c.SubscribeTopics([]string{"balances"}, nil)

    for {
        msg, err := c.ReadMessage(-1)
        if err == nil {
            fmt.Println(string(msg.Value))

            var event BalanceEvent
            if err := json.Unmarshal(msg.Value, &event); err != nil {
                fmt.Println("Error JSON:", err)
                continue
            }

            input := create_balance.CreateBalanceInputDTO{
                AccountID: event.Payload.AccountIDFrom,
                Balance:   event.Payload.BalanceAccountFrom,
            }
            createBalanceUseCase.Execute(input)

            input = create_balance.CreateBalanceInputDTO{
                AccountID: event.Payload.AccountIDTo,
                Balance:   event.Payload.BalanceAccountTo,
            }
            createBalanceUseCase.Execute(input)
        }
    }
}

