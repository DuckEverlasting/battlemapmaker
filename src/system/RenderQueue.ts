import { Subscription } from "../types";
import { State, Display } from ".";
import { Queueable } from "../graphics";

export class RenderQueue {
  private queue = new Set<Queueable>();
  private listeners: {[key in Subscription]: Set<Queueable>} = {
    click: new Set(),
    keyDown: new Set(),
    keyUp: new Set(),
    cursorMove: new Set(),
    tileChange: new Set()
  }

  constructor(public readonly layerCount: number) {}

  add(...args: Queueable[]) {
    args.forEach(queueable => {
      this.queue.add(queueable);
      queueable.subscriptions.forEach(key => this.listeners[key].add(queueable))
    });
  }

  remove(queueable: Queueable) {
    this.queue.delete(queueable);
    queueable.subscriptions.forEach(key => this.listeners[key].delete(queueable));
  }

  triggerEvent(event: keyof RenderQueue["listeners"] , state: State) {
    this.listeners[event].forEach(queueable => {
      queueable.update(state)
    });
  }

  getMarkedForRender() {
    let result = new Set<number>();
    this.queue.forEach(queueable => {
      queueable.isMarkedForRender().forEach(i => {
        result.add(i);
      })
    });
    return result;
  }

  render(display: Display, layers?: Set<number>) {
    layers.forEach(layer => {
      display.clearLayer(layer);
      if (layer >= display.effectLayersAt) {
        display.mainMarkedForRender = true;
      }
      this.queue.forEach(queueable => {
        if (queueable.onLayers.has(layer)) {
          queueable.render(display, {layer})
        }
      })
    })
  }

  clearAllMarkedForRender(layers: Set<number>) {
    layers.forEach(layer => {
      this.queue.forEach(queueable => {
        if (queueable.onLayers.has(layer)) {
          queueable.clearMarkedForRender(layer);
        }
      })
    })
  }
}
