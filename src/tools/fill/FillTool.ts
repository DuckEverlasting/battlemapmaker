import { FillType } from "./FillType";
import { SpriteInstance } from "../../graphics";
import { ISprite } from "../../types";

export class FillTool extends FillType {
  private sprite: ISprite;
  protected writesToTileMap = true;

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.tiles.forEach(v => {
      this.app.getTileMap().add(new SpriteInstance(this.sprite), v, this.layer);
    })
    this.sprite = null;
  }
}