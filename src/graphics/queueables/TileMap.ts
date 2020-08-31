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
    return this.graph[this.ind(v, layer)];
  }

  public add(sprite: Sprite, v: Vector, layer: number) {
    const index = this.ind(v, layer);
    this.manifest.add(sprite, layer, vect(v));
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], layer);
    }
    this.graph[this.ind(v, layer)] = sprite;
    this.markForRender(layer);
  }

  public remove(v: Vector, layer: number) {
    const index = this.ind(v, layer);
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
    const sprite = this.remove(orig, origLayer);
    this.add(sprite, dest, destLayer);
  }

  protected ind(v: Vector, layer: number) {
    return (this.columns * v.x + v.y) * layer;
  }

  public clearMarkedForRender() {
    this.markedForRender.fill(false);
  }

  public isMarkedForRender(): Set<number|"staging"> {
    const result = new Set<number|"staging">();
    this.markedForRender.forEach((marked, i) => {
      if (marked) {result.add(i)}
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
