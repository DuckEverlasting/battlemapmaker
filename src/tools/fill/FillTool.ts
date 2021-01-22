import { FillType } from "./FillType";
import { SpriteInstance } from "../../graphics";
import { ISprite } from "../../types";
import { App } from "../../system";

export class FillTool extends FillType {
  private sprite: ISprite;
  protected writesToTileMap = true;

  constructor(app: App) {
    super(app);
    this.name = "fill";
  }

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.tiles.forEach(v => {
      this.app.getTileMap().add(new SpriteInstance(this.sprite), v, this.layer);
    })
    this.sprite = null;
  }
}