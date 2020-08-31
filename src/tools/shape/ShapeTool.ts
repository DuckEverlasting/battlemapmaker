import { ShapeType } from "./ShapeType";
import { Sprite } from "../../graphics";
import { vect } from "../../util/Vector";

export class ShapeTool extends ShapeType {
  private sprite: Sprite | null;
  protected originalGraph: (Sprite|null)[];

  commitStart() {
    this.sprite = this.app.getState().activeSprite;
    this.originalGraph = this.tileMap.getLayerGraph(this.layer);
    this.tileMap.add(this.sprite.copy(), vect(this.origin), this.layer);
  }

  commitUpdate() {
    const nextGraph = this.originalGraph.map((item, i) => { 
      if (item === null && this.tileIndecies.has(i)) {
        return this.sprite.copy();
      }
      return item;
    })
    this.tileMap.replaceLayer(this.layer, nextGraph);
  }
  
  commitEnd() {
    this.reset();
  }

  reset() {
    this.originalGraph = [];
    this.layer = null;
    this.sprite = null;
    this.tileIndecies.clear();
    this.origin = null;
    this.dest = null;
  }
}