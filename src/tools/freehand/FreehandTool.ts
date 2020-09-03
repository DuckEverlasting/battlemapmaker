import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";
import { vect } from "../../util/Vector";
import { LAYER_TYPE } from "../../enums";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.tileMap.add(this.sprite, vect(this.latest), this.layer);
  }

  commitUpdate() {
    this.tileMap.add(this.sprite, vect(this.latest), this.layer);
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
