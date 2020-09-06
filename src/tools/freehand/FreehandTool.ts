import { FreehandType } from "./FreehandType";
import { Sprite, SpriteInstance } from "../../graphics";
import { vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    console.log(this.latest)
    this.tileMap.add(new SpriteInstance(this.sprite), vect(this.latest), this.layer);
  }

  commitUpdate() {
    this.tileMap.add(new SpriteInstance(this.sprite), vect(this.latest), this.layer);
  }

  commitEnd() {
    this.reset();
  }

  reset() {
    this.latest = null;
    this.layer = null;
    this.sprite = null;
  }
}
