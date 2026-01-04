# Desafio Docker + Go (Full Cycle 3.0)

Este projeto implementa o **Desafio Go com Docker** do curso **Full Cycle 3.0**.

O objetivo do desafio é criar uma imagem Docker extremamente enxuta utilizando **Go**, que ao ser executada exiba a mensagem:

Full Cycle Rocks!!


---

## 🎯 Objetivo do Desafio

Ao executar o comando:

```bash
docker run <seu-user>/fullcycle
O seguinte resultado deve ser exibido:

sql
Copiar código
Full Cycle Rocks!!
Além disso, a imagem Docker deve possuir menos de 2MB.

🧠 Tecnologias Utilizadas
Go

Docker

Docker Hub

Multistage Build

Imagem scratch

🏗️ Estrutura do Projeto
css
Copiar código
.
├── main.go
└── Dockerfile
🧩 Código da Aplicação
main.go
go
Copiar código
package main

import "fmt"

func main() {
	fmt.Println("Full Cycle Rocks!!")
}
🐳 Dockerfile
A imagem foi construída utilizando multistage build, compilando o binário Go e utilizando a imagem scratch como base final para garantir o menor tamanho possível.

Dockerfile
Copiar código
FROM golang:1.22-alpine AS builder

WORKDIR /app

COPY main.go .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o fullcycle

FROM scratch

COPY --from=builder /app/fullcycle /fullcycle

ENTRYPOINT ["/fullcycle"]
📦 Build da Imagem
bash
Copiar código
docker build -t fullcycle .
▶️ Executando a Aplicação
bash
Copiar código
docker run fullcycle
Resultado esperado:

sql
Copiar código
Full Cycle Rocks!!
