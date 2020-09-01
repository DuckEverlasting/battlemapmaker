import { ShapeType } from "./ShapeType";
import { Sprite } from "../../graphics";
import { vect } from "../../util/Vector";

export class ShapeTool extends ShapeType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;
  protected clearsOnUpdate = true;

  commitStart() {
    this.sprite = this.app.getState().activeSprite.copy();
    this.tileMap.add(this.sprite.copy(), vect(this.origin), this.layer);
  }

  commitUpdate() {
    this.tiles.forEach(tile => {
      this.tileMap.add(this.sprite.copy(), tile, this.layer);
    })
  }
  
  commitEnd() {
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