import { Display } from ".";
import { Queueable } from "../graphics";
import { EventHandler } from "../input";

export class RenderQueue {
  private queue = new Set<Queueable>();
  

  constructor(public readonly layerCount: number, private eventHandler: EventHandler) {}

  add(...args: Queueable[]) {
    args.forEach(queueable => {
      this.queue.add(queueable);
      this.eventHandler.subscribe(queueable);
    });
  }

  remove(...args: Queueable[]) {
    args.forEach(queueable => {
      this.queue.delete(queueable);
      this.eventHandler.unsubscribe(queueable);
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
