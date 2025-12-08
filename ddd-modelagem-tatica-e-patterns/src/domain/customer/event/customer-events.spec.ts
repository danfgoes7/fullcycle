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

  it("should call both handlers when customer is created", () => {
    const handler1 = new EnviaConsoleLog1Handler();
    const handler2 = new EnviaConsoleLog2Handler();

    const spyHandler1 = jest.spyOn(handler1, "handle");
    const spyHandler2 = jest.spyOn(handler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    new Customer("c1", "Customer 1");

    expect(spyHandler1).toHaveBeenCalled();
    expect(spyHandler2).toHaveBeenCalled();

  });

  it("should call address changed handler when customer address is changed", () => {
    const handler = new EnviaConsoleLogHandler();
    const spyHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", handler);

    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345-678", "São Paulo");

    customer.changeAddress(address);

    expect(spyHandler).toHaveBeenCalled();
  });
});
