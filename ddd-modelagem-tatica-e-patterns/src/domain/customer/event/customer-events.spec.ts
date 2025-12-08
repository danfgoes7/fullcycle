// src/domain/customer/event/customer-events.spec.ts

import { eventDispatcher } from "../../@shared/event/event-dispatcher";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import Customer from "../entity/customer";
import Address from "../value-object/address";

describe("Customer domain events tests", () => {
  beforeEach(() => {
    eventDispatcher.unregisterAll();
    jest.clearAllMocks();
  });

  it("should log two messages when customer is created", () => {
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    new Customer("c1", "Customer 1");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });

  it("should log message when customer address is changed", () => {
    const handler = new EnviaConsoleLogHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", handler);

    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345-678", "São Paulo");

    customer.changeAddress(address);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Endereço do cliente: c1, Customer 1 alterado para: Rua 1, 123, 12345-678 - São Paulo"
    );
  });
});

