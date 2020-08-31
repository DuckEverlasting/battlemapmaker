import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";
import { Vector, vect } from "../../util/Vector";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  private layer: number | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite;
    this.layer = this.app.getState().activeLayer;
    this.app.getDisplay().setStagingPosition(this.layer);
    this.staging.add(this.sprite.copy(), vect(this.latest[0]));
  }

  commitUpdate() {
    this.latest.forEach(v => {
      this.staging.add(this.sprite.copy(), vect(v))
    });
  }

  commitEnd() {
    this.app.getDisplay().setStagingPosition(null);
    this.tiles.forEach(vector => {
      this.tileMap.add(this.staging.get(vector), vector, this.layer);
    });
    this.reset();
  }

  reset() {
    this.latest = [];
    this.tiles = new Set();
    this.layer = null;
    this.sprite = null;
    this.staging.clear();
  }
}
