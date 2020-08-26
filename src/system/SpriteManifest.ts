import { Sprite } from "../graphics";

export class SpriteManifest {
  private all = new Set<Sprite>();
  private layers = new Array<Set<Sprite>>();

  constructor(layerCount: number) {
    for (let i = 0; i < layerCount; i++) {
      this.layers.push(new Set<Sprite>());
    }
  }

  has(sprite: Sprite) {
    return this.all.has(sprite);
  }

  layerHas(sprite: Sprite, layer: number) {
    return this.layers[layer].has(sprite);
  }

  getLayers() {
    return this.layers;
  }

  add(sprite: Sprite, layer: number) {
    if (this.has(sprite)) {
      throw new Error("Error: TileMap already contains sprite " + sprite.id);
    }
    this.all.add(sprite);
    this.layers[layer].add(sprite);
  }

  remove(sprite: Sprite, layer: number) {
    if (!this.has(sprite)) {
      throw new Error("Error: TileMap does not contains sprite " + sprite.id);
    }
    this.all.delete(sprite);
    this.layers[layer].delete(sprite);
  }
}