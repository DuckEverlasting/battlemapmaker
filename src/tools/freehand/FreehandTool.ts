import { FreehandType } from "./FreehandType";
import { Sprite, SpriteInstance } from "../../graphics";
import { vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.commitUpdate();
  }

  commitUpdate() {
    const offset = vect(
      Math.round(Math.random() * this.sprite.maxOffsetX),
      Math.round(Math.random() * this.sprite.maxOffsetY),
    );
    this.tileMap.add(new SpriteInstance(this.sprite, offset), vect(this.latest), this.layer);
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
