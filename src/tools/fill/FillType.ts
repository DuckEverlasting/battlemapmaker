import { BaseTool } from "../BaseTool";
import { MouseInput } from "../../types";
import { Vector, vect } from "../../util/Vector";
import { ImageSource } from "../../graphics";

export class FillType extends BaseTool {
  protected tiles: Set<Vector>;
  protected targetSourceId: string;

  onStart(input: MouseInput) {
    const target = this.tileMap.get(input.tile, this.layer);
    if (target === null) {
      this.targetSourceId = "";
    } else {
      this.targetSourceId = target.imageSource.id;
    }
    this.tiles = new Set([input.tile])
    const visited = new Set<string>([input.tile.toString()]);
    const stack = [input.tile];
    while(stack.length > 0) {
      const current = stack.pop();
      console.log("CHECKING: ", current)
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
    this.targetSourceId = "";
  }

  isEdge(v: Vector) {
    const source = this.tileMap.get(v, this.layer);
    const sourceId = source === null ? "" : source.imageSource.id;
    return sourceId !== this.targetSourceId;
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