import { BaseTool } from "../BaseTool";
import { Vector, vect } from "../../util/Vector";
import { MouseInput } from "../../types";

export abstract class ShapeType extends BaseTool {
  protected tiles: Set<Vector>;
  protected origin: Vector;
  protected dest: Vector;

  onStart(input: MouseInput) {
    this.origin = input.tile;
    this.tiles = new Set([input.tile]);
    this.commitStart();
  }

  onUpdate(input: MouseInput) {
    this.dest = input.tile;
    this.tiles = this.getSquare();
    this.commitUpdate();
  }

  onEnd() {
    this.commitEnd();
  }

  getSquare() {
    const result = new Set<Vector>();
    const x1 = Math.min(this.origin.x, this.dest.x),
      x2 = Math.max(this.origin.x, this.dest.x),
      y1 = Math.min(this.origin.y, this.dest.y),
      y2 = Math.max(this.origin.y, this.dest.y);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        result.add(vect(x, y));
      }
    }
    return result;
  }

  commitStart() {}

  commitUpdate() {}

  commitEnd() {}
}