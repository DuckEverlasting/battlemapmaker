import { Sprite } from "..";
import { Vector } from "../../util/Vector";

export class SpriteManifest {
  private all: {[id: string]: Sprite} = {};
  private layers = new Array<{[id: string]: Vector}>();

  constructor(layerCount: number) {
    for (let i = 0; i < layerCount; i++) {
      this.layers.push({});
    }
  }

  has(sprite: Sprite) {
    return !!this.all[sprite.id];
  }

  layerHas(sprite: Sprite, layer: number) {
    return !!this.layers[layer][sprite.id];
  }

  getLayerOf(sprite: Sprite) {
    return this.layers.findIndex(layer => !!layer[sprite.id]);
  }

  getSpriteVector(sprite: Sprite, layer?: number) {
    if (!this.has(sprite)) {
      throw new Error("TileMap does not contains sprite " + sprite.id);
    }
    if (!layer) {
      layer = this.getLayerOf(sprite);
    }
    return this.layers[layer][sprite.id];
  }

  getSpritesAndVectorsFrom(layer: number) {
    const result: [Sprite, Vector][] = [];
    Object.keys(this.layers[layer]).forEach(id => {(
      result.push([this.all[id], this.layers[layer][id]])
    )});
    return result;
  }

  add(sprite: Sprite, layer: number, vector: Vector) {
    if (this.has(sprite)) {
      throw new Error("Error: TileMap already contains sprite " + sprite.id);
    }
    this.all[sprite.id] = sprite;
    this.layers[layer][sprite.id] = vector;
  }

  remove(sprite: Sprite, layer: number) {
    if (!this.has(sprite)) {
      throw new Error("Error: TileMap does not contains sprite " + sprite.id);
    }
    if (!layer) {
      layer = this.layers.findIndex(layer => !!layer[sprite.id])
    }
    delete this.all[sprite.id];
    delete this.layers[layer][sprite.id];
  }

  clear() {
    this.all = {};
    this.layers = this.layers.map(() => ({}));
  }
}
