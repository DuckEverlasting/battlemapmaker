import { QueueableFlag } from "../types";
import { State, Display } from ".";
import { Queueable } from "../graphics";

export class RenderQueue {
  private queue = new Set<Queueable>();

  constructor(public readonly layerCount: number) {}

  add(...args: Queueable[]) {
    args.forEach(queueable => this.queue.add(queueable));
  }

  remove(queueable: Queueable) {
    this.queue.delete(queueable);
  }

  triggerFlag(flag: QueueableFlag, state: State) {
    this.queue.forEach(queueable => {
      if (queueable.getFlags().includes(flag)) {
        queueable.update(state)
      }
    })
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
