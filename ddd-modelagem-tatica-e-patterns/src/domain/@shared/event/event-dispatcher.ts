// src/domain/@shared/event/event-dispatcher.ts

import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  getEventHandlers(eventName: string): EventHandlerInterface[] {
    return this.eventHandlers[eventName] || [];
  }

  register(eventName: string, handler: EventHandlerInterface): void {
    const handlers = this.eventHandlers[eventName] || [];
    handlers.push(handler);
    this.eventHandlers[eventName] = handlers;
  }

  unregister(eventName: string, handler: EventHandlerInterface): void {
    const handlers = this.eventHandlers[eventName] || [];
    this.eventHandlers[eventName] = handlers.filter((h) => h !== handler);
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const handlers = this.eventHandlers[eventName] || [];

    handlers.forEach((handler) => handler.handle(event));
  }
}

// singleton (pra ficar fácil de usar em qualquer lugar)
export const eventDispatcher = new EventDispatcher();

