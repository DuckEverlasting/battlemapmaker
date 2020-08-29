import { Sprite } from "..";
import { Display, State, SpriteManifest } from "../../system"
import { Queueable } from "./Queueable";
import { Vector } from "../../util/Vector";
import { getRange } from "../../util/helpers";

export class TileMap extends Queueable {
  private graph: (Sprite | null)[];
  private manifest: SpriteManifest;
  private markedForRender: boolean[];

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

  public get(x: number, y: number, layer: number) {
    return this.graph[this.ind(x, y, layer)];
  }

  public add(sprite: Sprite, x: number, y: number, layer: number) {
    const index = this.ind(x, y, layer);
    this.manifest.add(sprite, layer, new Vector(x, y));
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], layer);
    }
    this.graph[this.ind(x, y, layer)] = sprite;
    this.markForRender(layer);
  }

  public remove(x: number, y: number, layer: number) {
    const index = this.ind(x, y, layer);
    const sprite = this.graph[index];
    if (sprite !== null) {
      this.manifest.remove(sprite, layer);
      this.graph[index] = null;
      this.markForRender(layer);
    }
    return sprite;
  }

  public move(
    origX: number,
    origY: number,
    origLayer: number,
    destX: number,
    destY: number,
    destLayer: number
  ) {
    const sprite = this.remove(origX, origY, origLayer);
    this.add(sprite, destX, destY, destLayer);
  }

  private ind(x: number, y: number, layer: number) {
    return (this.columns * x + y) * layer;
  }

  public clearMarkedForRender() {
    this.markedForRender.fill(false);
  }

  public isMarkedForRender(): Set<number> {
    const result = new Set<number>();
    this.markedForRender.forEach((marked, i) => {
      if (marked) {result.add(i)}
    })
    return result;
  }

  private markForRender(layer: number) {
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
