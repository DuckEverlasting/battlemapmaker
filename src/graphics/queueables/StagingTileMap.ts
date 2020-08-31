import { Sprite, TileMap } from "../";
import { Display } from "../../system"
import { Vector } from "../../util/Vector";

export class StagingTileMap extends TileMap {
  constructor(
    rows: number,
    columns: number,
  ) {
    super(rows, columns, 1);
    this.onLayers.clear();
    this.onLayers.add("staging");
  }

  public get(v: Vector) {
    return this.graph[this.ind(v)];
  }

  public add(sprite: Sprite, v: Vector) {
    const index = this.ind(v);
    this.manifest.add(sprite, 0, v);
    if (this.graph[index] !== null) {
      this.manifest.remove(this.graph[index], 0);
    }
    this.graph[this.ind(v)] = sprite;
    this.markForRender();
  }

  public remove(v: Vector) {
    const index = this.ind(v);
    const sprite = this.graph[index];
    if (sprite !== null) {
      this.manifest.remove(sprite, 0);
      this.graph[index] = null;
      this.markForRender();
    }
    return sprite;
  }

  public move(
    orig: Vector,
    dest: Vector,
  ) {
    const sprite = this.remove(orig);
    this.add(sprite, dest);
  }

  protected ind(v: Vector) {
    return (this.columns * v.y + v.x);
  }

  public isMarkedForRender(): Set<number|"staging"> {
    const result = new Set<"staging">();
    if (this.markedForRender[0]) {
      result.add("staging")
    }
    return result;
  }

  protected markForRender() {
    this.markedForRender[0] = true;
  }

  render(display: Display) {
    const data = this.manifest.getSpritesAndVectorsFrom(0);
    data.forEach(tuple => {
      tuple[0].render(display, {tile: tuple[1], layer: "staging"});
    })
  }
}
