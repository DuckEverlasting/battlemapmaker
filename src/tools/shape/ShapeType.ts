import { BaseTool } from "../BaseTool";
import { Vector, vect } from "../../util/Vector";
import { MouseInput } from "../../types";
import { Sprite } from "../../graphics";

export abstract class ShapeType extends BaseTool {
  protected tileIndecies: Set<number>;
  protected origin: Vector;
  protected dest: Vector;

  onStart(input: MouseInput) {
    this.origin = input.tile;
    this.tileIndecies = new Set([input.tile.y * this.tileMap.columns + input.tile.x]);
    this.commitStart();
  }

  onUpdate(input: MouseInput) {
    this.dest = input.tile;
    this.tileIndecies = this.getSquare();
    this.commitUpdate();
  }

  onEnd(input: MouseInput) {
    this.commitEnd();
  }

  getSquare() {
    const result = new Set<number>();
    const x1 = Math.min(this.origin.x, this.dest.x),
      x2 = Math.max(this.origin.x, this.dest.x),
      y1 = Math.min(this.origin.y, this.dest.y),
      y2 = Math.max(this.origin.y, this.dest.y);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        result.add(y * this.tileMap.columns + x);
      }
    }
    return result;
  }

  commitStart() {}

  commitUpdate() {}

  commitEnd() {}
}