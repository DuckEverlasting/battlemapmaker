import { ShapeType } from "./ShapeType";
import { Sprite, SpriteInstance } from "../../graphics";
import { vect } from "../../util/Vector";
import { LAYER_TYPE } from "../../enums";

export class ShapeTool extends ShapeType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;
  protected clearsOnUpdate = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.tileMap.add(new SpriteInstance(this.sprite), vect(this.origin), this.layer);
  }

  commitUpdate() {
    this.tiles.forEach(tile => {
      this.tileMap.add(new SpriteInstance(this.sprite), tile, this.layer);
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