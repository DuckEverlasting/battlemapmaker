import { SpriteInstance } from "..";
import { Vector } from "../../util/Vector";

export class SpriteManifest {
  private all: {[id: string]: SpriteInstance} = {};
  private layers: {[id: string]: Vector}[] = [];
  private saveStack: {
    all: {[id: string]: SpriteInstance},
    layers: {[id: string]: Vector}[]
  }[] = [];
  private redoStack: {
    all: {[id: string]: SpriteInstance},
    layers: {[id: string]: Vector}[]
  }[] = [];

  constructor(layerCount: number) {
    for (let i = 0; i < layerCount; i++) {
      this.layers.push({});
    }
  }

  has(instance: SpriteInstance) {
    return !!this.all[instance.id];
  }

  layerHas(instance: SpriteInstance, layer: number) {
    return !!this.layers[layer][instance.id];
  }

  getLayerOf(instance: SpriteInstance) {
    return this.layers.findIndex(layer => !!layer[instance.id]);
  }

  getInstanceVector(instance: SpriteInstance, layer?: number) {
    if (!this.has(instance)) {
      throw new Error("TileMap does not contains instance " + instance.id);
    }
    if (!layer) {
      layer = this.getLayerOf(instance);
    }
    return this.layers[layer][instance.id];
  }

  getInstancesAndVectorsFrom(layer: number) {
    const result: [SpriteInstance, Vector][] = [];
    Object.keys(this.layers[layer]).forEach(id => {(
      result.push([this.all[id], this.layers[layer][id]])
    )});
    return result;
  }

  add(instance: SpriteInstance, layer: number, vector: Vector) {
    if (this.has(instance)) {
      throw new Error("Error: TileMap already contains instance " + instance.id);
    }
    this.all[instance.id] = instance;
    this.layers[layer][instance.id] = vector;
  }

  remove(instance: SpriteInstance, layer: number) {
    if (!this.has(instance)) {
      throw new Error("Error: TileMap does not contains instance " + instance.id);
    }
    if (!layer) {
      layer = this.layers.findIndex(layer => !!layer[instance.id])
    }
    delete this.all[instance.id];
    delete this.layers[layer][instance.id];
  }

  clear() {
    this.all = {};
    this.layers = this.layers.map(() => ({}));
  }

  getCurrentState() {
    const savedLayers: {[id: string]: Vector}[] = [];
    this.layers.forEach(layer => {
      savedLayers.push({...layer})
    })
    return {all: {...this.all}, layers: savedLayers};
  }

  save() {
    this.redoStack = [];
    this.saveStack.push(this.getCurrentState());
  }

  undo() {
    this.redoStack.push(this.getCurrentState());
    const data = this.saveStack.pop();
    this.all = data.all;
    this.layers = data.layers;
  }

  redo() {
    this.saveStack.push(this.getCurrentState());
    const data = this.redoStack.pop();
    this.all = data.all;
    this.layers = data.layers;
  }
}
