import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import CheckoutController from "./controllers/checkout.controller";
import InvoiceController from "./controllers/invoice.controller";

import InvoiceFacade from "../src/facade/invoice.facade";
import { InMemoryInvoiceRepository } from "../src/infra/repository/invoice.repository.memory";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cria uma instância única do repositório e facade
const invoiceRepository = new InMemoryInvoiceRepository();
const invoiceFacade = new InvoiceFacade(invoiceRepository);

// Rotas
app.post("/checkout", (req, res) => CheckoutController.processCheckout(req, res, invoiceFacade));
app.get("/invoice/:id", (req, res) => InvoiceController.getInvoice(req, res, invoiceFacade));

// Produtos
app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Invalid input" });

  // Simula criação em memória
  const product = { id: `prod-${Date.now()}`, name, price };
  res.status(201).json(product);
});

// Clientes
app.post("/clients", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Invalid input" });

  // Simula criação em memória
  const client = { id: `cli-${Date.now()}`, name, email };
  res.status(201).json(client);
});


export default app;

