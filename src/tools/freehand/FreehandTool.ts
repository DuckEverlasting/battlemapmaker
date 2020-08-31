import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";
import { Vector, vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite;
    this.tileMap.add(this.sprite.copy(), vect(this.latest[0]), this.layer);
  }

  commitUpdate() {
    this.latest.forEach(v => {
      this.tileMap.add(this.sprite.copy(), vect(v), this.layer);
    });
  }

  commitEnd() {
    this.reset();
  }

  reset() {
    this.latest = [];
    this.layer = null;
    this.sprite = null;
  }
}
