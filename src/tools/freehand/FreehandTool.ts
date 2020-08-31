import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";
import { Vector, vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  private layer: number | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite;
    this.layer = this.app.getState().activeLayer;
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
    this.tiles = new Set();
    this.layer = null;
    this.sprite = null;
  }
}
