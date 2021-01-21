import { ShapeType } from "./ShapeType";
import { SpriteInstance } from "../../graphics";
import { vect } from "../../util/Vector";
import { ISprite } from "../../types";

export class ShapeTool extends ShapeType {
  private sprite: ISprite;
  protected writesToTileMap = true;
  protected clearsOnUpdate = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.app.getTileMap().add(new SpriteInstance(this.sprite), vect(this.origin), this.layer);
  }

  commitUpdate() {
    this.tiles.forEach(tile => {
      this.app.getTileMap().add(new SpriteInstance(this.sprite), tile, this.layer);
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