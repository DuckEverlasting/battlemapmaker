import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";
import { Vector, vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite.copy();
    this.tileMap.add(this.sprite.copy(), vect(this.latest), this.layer);
  }

  commitUpdate() {
    this.tileMap.add(this.sprite.copy(), vect(this.latest), this.layer);
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
