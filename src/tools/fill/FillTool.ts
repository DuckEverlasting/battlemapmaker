import { FillType } from "./FillType";
import { Sprite } from "../../graphics";

export class FillTool extends FillType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;

  commitStart() {
    console.log(this.tiles);
    this.sprite = this.app.getState().activeSprite.copy();
    this.tiles.forEach(v => {
      this.tileMap.add(this.sprite.copy(), v, this.layer);
    })
    this.sprite = null;
  }
}