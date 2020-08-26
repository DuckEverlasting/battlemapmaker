import { Renderable } from "../types";

export class RenderQueue {
  private layers: Set<Renderable>[];
  private markedForRender: boolean[];

  constructor(layerCount: number) {
    // [bg], [object1], [object2], [overlay1], [overlay2]
    this.layers = [];
    for (let i = 0; i < layerCount; i++) {
      this.layers.push(new Set());
    }
    this.markedForRender = new Array(layerCount).fill(false);
  }

  add(renderable: Renderable, layer: number) {
    if (layer < 0 || layer >= this.layers.length) {
      throw new Error(`${layer} is not a valid layer.`);
    }
    this.layers[layer].add(renderable);
    if (renderable.setLayer) {
      renderable.setLayer(layer);
    }
    this.markForRender(layer);
  }

  remove(renderable: Renderable, layer: number) {
    this.layers[layer].delete(renderable);
    this.markForRender(layer);
  }

  markForRender(layer: number) {
    this.markedForRender[layer] = true;
  }

  clearMarkedForRender() {
    this.markedForRender.fill(false);
  }

  getMarkedForRender(): Array<Set<Renderable>|null> {
    return this.layers.map((layer, i) => !!this.markedForRender[i] ? layer : null);
  }

  isEmpty() {
    return !this.layers.find(layer => !!layer.size);
  }

  reset() {
    this.layers = [
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set()
    ];
  }
}
