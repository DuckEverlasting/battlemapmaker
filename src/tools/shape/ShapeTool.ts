import { ShapeType } from "./ShapeType";
import { Sprite } from "../../graphics";
import { vect } from "../../util/Vector";

export class ShapeTool extends ShapeType {
  private sprite: Sprite | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite;
    this.tileMap.save();
    this.tileMap.add(this.sprite.copy(), vect(this.origin), this.layer);
  }

  commitUpdate() {
    this.tileMap.restore();
    this.tileMap.save();
    this.tiles.forEach(tile => {
      this.tileMap.add(this.sprite.copy(), tile, this.layer);
    })
  }
  
  commitEnd() {
    this.tileMap.clearSave();
    this.reset();
  }

  reset() {
    this.layer = null;
    this.sprite = null;
    this.tiles.clear();
    this.origin = null;
    this.dest = null;
  }
}