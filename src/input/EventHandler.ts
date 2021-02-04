import { State } from "../system";
import { Observer, Subscription } from "../types";

export class EventHandler {
  private listeners: {[key in Subscription]: Set<Observer>} = {
    click: new Set(),
    keyDown: new Set(),
    keyUp: new Set(),
    cursorMove: new Set(),
    tileChange: new Set(),
    palleteChange: new Set()
  }

  subscribe(observer: Observer) {
    observer.subscriptions.forEach(key => this.listeners[key].add(observer));
  }

  unsubscribe(observer: Observer) {
    observer.subscriptions.forEach(key => this.listeners[key].delete(observer));
  }

  triggerEvent(event: Subscription , state: State) {
    this.listeners[event].forEach(observer => {
      observer.update(state);
    });
  }
}
