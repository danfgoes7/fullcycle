# Desafio Docker + Nginx + Node.js (Full Cycle 3.0)

Este projeto implementa o desafio de **Docker com Nginx como Proxy Reverso**, utilizando **Node.js** e **MySQL**, conforme proposto no curso **Full Cycle 3.0**.

---

## 🎯 Objetivo do Desafio

Ao acessar o Nginx na porta **8080**, o fluxo deve ser:

1. Nginx recebe a requisição
2. Encaminha para a aplicação Node.js
3. A aplicação Node.js:
   - Insere um novo registro na tabela `people`
   - Retorna:
     - A mensagem **Full Cycle Rocks!**
     - A lista de nomes cadastrados no banco de dados

Tudo deve funcionar apenas com:

```bash
docker-compose up -d
