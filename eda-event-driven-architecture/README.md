# Full Cycle 3.0 - Módulo EDA Event Driven Architecture

## Desafio

Desenvolva um microsserviço em sua linguagem de preferência que seja capaz de receber via Kafka os eventos gerados pelo microsserviço "Wallet Core" e persistir no banco de dados os balances atualizados para cada conta.

Crie um endpoint: `/balances/{account_id}` que exibe o balance atualizado.

Requisitos para entrega:
- Tudo deve rodar via Docker / Docker-compose
- Com um único docker-compose up -d todos os microsserviços, incluindo o da wallet core precisam estar disponíveis para que possamos fazer a correção.
- Não esqueça de rodar migrations e popular dados fictícios em ambos bancos de dados (wallet core e o microsserviço de balances) de forma automática quando os serviços subirem.
- Gere o arquivo ".http" para realizarmos as chamadas em seu microsserviço da mesma forma que fizemos no microsserviço "wallet core"
- Disponibilize o microsserviço na porta: 3003.

---

## Instruções

Para fazer o `build` de todos serviços no diretório raiz executo o comando `docker compose up --build` com isso as imagens serão baixadas e executadas.

Após todos containers estiverem em rodando, inicie as aplicações:

### Serviço de Wallet

Execute o comando `docker compose exec wallet-app bash` após acessar o container execute o comando `go run cmd/walletcore/main.go` ele irá rodas as migrations e subir o sevidor na porta `8080`.

### Serviço de Balances

Execute o comando `docker compose exec balances-app bash` após acessar o container execute o comando `go run cmd/balances/main.go` ele irá rodas as migrations e subir o sevidor na porta `3003`.

Os dois serviços já tem seu arquivo de `api/client.http` já com os `IDs` corretos, mas nada impede te criar novos registros e usar os mesmos.

---

### Tipos de eventos
1. Event Notification: Forma curta de comunicação, ex.: `{ "order": 1, "status": "approved" }`;
2. Event Carried State Transfer: Formato completo para trafegar as informações, ex.: `stream de dados` `{ "order": 1, "status": "approved", "products": [{ ... }, { ... }], "tax": "1%", "client": "John Doe" }`;
3. Event Sourcing: Armazenamento dos eventos baseado em uma linha do tempo, possibilidade de replay;

### Event Colaboration
- Metodo tradicional, precisa consultar informações:
    - John Doe compra um produto -> Checar Estoque do produto comprado -> Muda o catálogo -> Emite nota -> Separação -> ... -> ...;
- Event Colaboration, parte do princípio que já tem as informações para uma determinada ação:
    - John Doe compra um produto;
    - Estoque mudou;
    - Cor Mudou;
    - Nota foi emitida;
    - Erro aconteceu;
    - Produto mudou a descrição;

### CQRS (Command Query Responsibility Segregation) + Event Sourcing
- CQS x CQRS
    - Nível de granularidade;
- Comando: Intenção de mudança do usuário e não tem retorno:
    - Criar Produto
- Consulta: Foca apenas no dado;
- Pode se ter bancos de dados separados para Escrita e Leitura:
    - Escrita: `{ "id": 1, "product": 2, "category": 3 }` -> dispara um evento para atualizar o bando de leitura;
    - Leitura: `{ "id": 1, "product": "Carrinho", "categoria": "Brinquedo" }` -> Informação já consolidada;
_ CQRS + Event Sorcing: Não é uma regra mas é recomendado, pois a consolidação dos dados pode ser feita utilizando o Event Sorcing;

### Elementos táticos de um contexto de eventos
- Evento (Carregar dados);
- Operações que serão executadas quando um evento é chamado;
- Gerenciador dos nossos eventos / operações;
    - Registrar os eventos e suas operações;
    - Despachar / Fire no evento para que suas operações sejam executadas;
