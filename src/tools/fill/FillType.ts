import { BaseTool } from "../BaseTool";
import { MouseInput } from "../../types";
import { Vector, vect } from "../../util/Vector";

export class FillType extends BaseTool {
  protected tiles: Set<Vector>;
  protected targetSpriteId: string;

  onStart(input: MouseInput) {
    const target = this.tileMap.get(input.tile, this.layer);
    if (target === null) {
      this.targetSpriteId = "";
    } else {
      this.targetSpriteId = target.spriteId;
    }
    this.tiles = new Set([input.tile])
    const visited = new Set<string>([input.tile.toString()]);
    const stack = [input.tile];
    while(stack.length > 0) {
      const current = stack.pop();
      if (this.isEdge(current)) {continue;}
      this.tiles.add(current);
      this.getSurrounding(current).forEach(v => {
        const vString = v.toString();
        if (!visited.has(vString)) {
          visited.add(vString);
          stack.push(v);
        }
      });
    }
    this.commitStart();
    this.tiles.clear();
    this.targetSpriteId = "";
  }

  isEdge(v: Vector) {
    const instance = this.tileMap.get(v, this.layer);
    const spriteId = instance === null ? "" : instance.spriteId;
    return spriteId !== this.targetSpriteId;
  }

  getSurrounding(v: Vector) {
    const result = [];
    if (v.x - 1 >= 0) {
      result.push(vect(v.x - 1, v.y))
    }
    if (v.x + 1 < this.tileMap.columns) {
      result.push(vect(v.x + 1, v.y))
    }
    if (v.y - 1 >= 0) {
      result.push(vect(v.x, v.y - 1))
    }
    if (v.y + 1 < this.tileMap.rows) {
      result.push(vect(v.x, v.y + 1))
    }
    return result;
  }
  
  commitStart() {}
}