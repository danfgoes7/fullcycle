import { InMemoryInvoiceRepository } from "../infra/repository/invoice.repository.memory";
import { GenerateInvoiceUseCase } from "../usecase/generate-invoice.usecase";
import { FindInvoiceUseCase } from "../usecase/find-invoice.usecase";

describe("Invoice Facade", () => {
  let repository: InMemoryInvoiceRepository;
  let generateUseCase: GenerateInvoiceUseCase;
  let findUseCase: FindInvoiceUseCase;

  beforeEach(() => {
    repository = new InMemoryInvoiceRepository();
    generateUseCase = new GenerateInvoiceUseCase(repository);
    findUseCase = new FindInvoiceUseCase(repository);
  });

  it("should generate an invoice", async () => {
    const input = {
      name: "John Doe",
      document: "123456789",
      street: "Av. Teste",
      number: "100",
      complement: "Apt 101",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      items: [
        { name: "Product 1", price: 100 },
        { name: "Product 2", price: 50 },
      ],
    };

    const output = await generateUseCase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.items).toHaveLength(2);
    expect(output.total).toBe(150);
  });

  it("should find an existing invoice", async () => {
    const input = {
      name: "John Doe",
      document: "123456789",
      street: "Av. Teste",
      number: "100",
      complement: "Apt 101",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      items: [
        { name: "Product 1", price: 100 },
        { name: "Product 2", price: 50 },
      ],
    };

    const generated = await generateUseCase.execute(input);

    const found = await findUseCase.execute({ id: generated.id });

    expect(found.id).toBe(generated.id);
    expect(found.name).toBe(input.name);
    expect(found.items).toHaveLength(2);
    expect(found.total).toBe(150);
  });

  it("should throw an error if invoice not found", async () => {
    await expect(findUseCase.execute({ id: "non-existent-id" })).rejects.toThrow(
      "Invoice not found"
    );
  });
});

