import { FillType } from "./FillType";
import { Sprite, SpriteInstance } from "../../graphics";

export class FillTool extends FillType {
  private sprite: Sprite | null;
  protected writesToTileMap = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.tiles.forEach(v => {
      this.app.getTileMap().add(new SpriteInstance(this.sprite), v, this.layer);
    })
    this.sprite = null;
  }
}