import request from "supertest";
import app from "../app";

describe("API Endpoints", () => {
  it("POST /products should create a product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "Produto Teste", price: 100 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Produto Teste");
  });

  it("POST /clients should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send({ name: "Cliente Teste", email: "teste@email.com" });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Cliente Teste");
  });

  it("POST /checkout should process an invoice", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        name: "Cliente Teste",
        document: "12345678900",
        street: "Rua A",
        number: "123",
        complement: "",
        city: "Cidade",
        state: "ST",
        zipCode: "12345-678",
        items: [{ id: "item1", name: "Produto Teste", price: 100 }],
      });
    expect(response.status).toBe(201);
    expect(response.body.total).toBe(100);
  });

  it("GET /invoice/:id should return an invoice", async () => {
    // Criando um invoice temporário
    const checkoutResponse = await request(app)
      .post("/checkout")
      .send({
        name: "Cliente Teste",
        document: "12345678900",
        street: "Rua A",
        number: "123",
        complement: "",
        city: "Cidade",
        state: "ST",
        zipCode: "12345-678",
        items: [{ id: "item1", name: "Produto Teste", price: 100 }],
      });

    const invoiceId = checkoutResponse.body.id;

    const response = await request(app).get(`/invoice/${invoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(invoiceId);
  });
});

