import { Sprite, SpriteManifest } from "../";
import { Display } from "../../system"
import { Queueable } from "./Queueable";
import { Vector, vect } from "../../util/Vector";
import { getRange } from "../../util/helpers";

export class TileMap extends Queueable {
  protected graph: (Sprite | null)[];
  protected manifest: SpriteManifest;
  protected markedForRender: boolean[];

  constructor(
    public readonly rows: number,
    public readonly columns: number,
    public readonly layerCount: number,
  ) {
    super(new Set(getRange(0, layerCount)));
    this.graph = new Array<Sprite | null>(rows * columns * layerCount).fill(null);
    this.manifest = new SpriteManifest(layerCount);
    this.markedForRender = new Array(layerCount).fill(false);
  }

  public get(v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return;}
    return this.graph[this.getInd(v, layer)];
  }

  public getLayerGraph(layer: number): (Sprite|null)[] {
    return this.graph.filter((tile, i) => i % this.layerCount === layer);
  }

  public replaceLayer(layer: number, graph: (Sprite|null)[]) {
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

  public add(sprite: Sprite, v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return;}
    const index = this.getInd(v, layer);
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], layer);
    }
    this.manifest.add(sprite, layer, vect(v));
    this.graph[this.getInd(v, layer)] = sprite;
    this.markForRender(layer);
  }

  public remove(v: Vector, layer: number) {
    if (!this.vectorInBounds(v)) {return;}
    const index = this.getInd(v, layer);
    const sprite = this.graph[index];
    if (sprite !== null) {
      this.manifest.remove(sprite, layer);
      this.graph[index] = null;
      this.markForRender(layer);
    }
    return sprite;
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
    const sprite = this.remove(orig, origLayer);
    this.add(sprite, dest, destLayer);
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
      && v.y < this.columns
    );
  }

  public clearMarkedForRender(layer: number) {
    this.markedForRender[layer] = false;
  }

  public isMarkedForRender(): Set<number> {
    const result = new Set<number>();
    this.markedForRender.forEach((marked, i) => {
      if (marked) {
        result.add(i)
      }
    })
    return result;
  }

  protected markForRender(layer: number) {
    this.markedForRender[layer] = true;
  }

  render(display: Display, props: {layer: number}) {
    const data = this.manifest.getSpritesAndVectorsFrom(props.layer);
    data.forEach(tuple => {
      tuple[0].render(display, {tile: tuple[1], layer: props.layer});
    })
  }

  getFlags() {
    return [...this.flags]
  }
}
