import { SpriteInstance, SpriteManifest } from "../";
import { Display } from "../../system"
import { Queueable } from "./Queueable";
import { Vector, vect } from "../../util/Vector";
import { getRange } from "../../util/helpers";

export class TileMap extends Queueable {
  protected graph: (SpriteInstance | null)[];
  protected manifest: SpriteManifest;
  protected markedForRender: boolean[];
  protected saveStack: (SpriteInstance | null)[][] = [];
  protected redoStack: (SpriteInstance | null)[][] = [];
  protected count = 0;
  protected countUndo:number[] = [];
  protected countRedo:number[] = [];

  constructor(
    public readonly rows: number,
    public readonly columns: number,
    public readonly layerCount: number,
  ) {
    super(new Set(getRange(0, layerCount)));
    this.graph = new Array<SpriteInstance | null>(rows * columns * layerCount).fill(null);
    this.manifest = new SpriteManifest(layerCount);
    this.markedForRender = new Array(layerCount).fill(false);
  }

  public get(v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return null;}
    return this.graph[this.getInd(v, layer)];
  }

  public getLayerGraph(layer: number): (SpriteInstance | null)[] {
    return this.graph.filter((tile, i) => i % this.layerCount === layer);
  }

  public replaceLayer(layer: number, graph: (SpriteInstance | null)[]) {
    graph.forEach((item, i) => {
      if (item === null) {
        this.remove(this.getVec(i), layer);
      } else if (this.manifest.has(item)) {
        return;
      } else {
        this.add(item, this.getVec(i), layer);
      }
    })
  }

  public add(instance: SpriteInstance, v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return;}
    const index = this.getInd(v, layer);
    this.manifest.add(instance, layer, vect(v));
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], layer);
    }
    this.graph[this.getInd(v, layer)] = instance;
    this.markForRender(layer);
  }

  public remove(v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return null;}
    const index = this.getInd(v, layer);
    const instance = this.graph[index];
    if (instance !== null) {
      this.manifest.remove(instance, layer);
      this.graph[index] = null;
      this.markForRender(layer);
    }
    return instance;
  }

  public clear() {
    this.graph.fill(null);
    this.manifest.clear();
    this.markedForRender.fill(true);
  }

  public move(
    orig: Vector,
    dest: Vector,
    origLayer: number,
    destLayer: number
  ) {
    if (!this.vectorInBounds(orig) || !this.vectorInBounds(dest)) {return;}
    const instance = this.remove(orig, origLayer);
    this.add(instance, dest, destLayer);
  }

  public getAdjacent(v: Vector, layer: number) {
    const result: (SpriteInstance | null)[] = [];
    [vect(v.x, v.y-1), vect(v.x+1, v.y), vect(v.x, v.y+1), vect(v.x-1, v.y)].forEach(v => {
      if (this.vectorInBounds(v)) {
        result.push(this.get(v, layer));
      } else {
        result.push(null);
      }
    })
    return result;
  }

  protected getInd(v: Vector, layer: number) {
    return (this.columns * v.y + v.x) * this.layerCount + layer;
  }

  protected getVec(i: number) {
    const layerInd = (i - i % this.layerCount) / this.layerCount,
      x = layerInd % this.columns,
      y = Math.floor(layerInd / this.columns);
    return vect(x, y);
  }

  protected vectorInBounds(v: Vector) {
    return (
      v.x >= 0
      && v.y >= 0
      && v.x < this.columns
      && v.y < this.rows
    );
  }

  public clearMarkedForRender(layer: number) {
    this.markedForRender[layer] = false;
  }

  public isMarkedForRender(): number[] {
    const result: number[] = [];
    this.markedForRender.forEach((marked, i) => {
      if (marked) {
        result.push(i)
      }
    })
    return result;
  }

  protected markForRender(layer: number) {
    this.markedForRender[layer] = true;
  }

  render(display: Display, props: {layer: number}) {
    const data = this.manifest.getInstancesAndVectorsFrom(props.layer);
    data.forEach(tuple => {
      tuple[0].sprite.render(display, {tile: tuple[1], layer: props.layer, tileMap: this});
    })
  }

  getFlags() {
    return [...this.flags]
  }

  save() {
    this.manifest.save();
    this.redoStack = [];
    this.saveStack.push([...this.graph]);
    
  }

  undo() {
    if (this.saveStack.length === 0) {return;}
    this.manifest.undo();
    this.redoStack.push([...this.graph]);
    this.graph = this.saveStack.pop();
    this.markedForRender.fill(true);
  }

  redo() {
    if (this.redoStack.length === 0) {return;}
    this.manifest.redo();
    this.saveStack.push([...this.graph]);
    this.graph = this.redoStack.pop();
    this.markedForRender.fill(true);
  }
}
