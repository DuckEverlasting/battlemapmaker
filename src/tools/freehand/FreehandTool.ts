import { FreehandType } from "./FreehandType";
import { SpriteInstance } from "../../graphics";
import { vect } from "../../util/Vector";
import { ISprite } from "../../types";
import { App } from "../../system";

export class FreehandTool extends FreehandType {
  private sprite: ISprite;
  protected writesToTileMap = true;

  constructor(app: App) {
    super(app);
    this.name = "freehand";
  }

  commitStart() {
    this.sprite = this.app.getState().getActiveSprite();
    this.commitUpdate();
  }

  commitUpdate() {
    const offset = vect(
      Math.round(Math.random() * this.sprite.maxOffsetX),
      Math.round(Math.random() * this.sprite.maxOffsetY),
    );
    this.app.getTileMap().add(new SpriteInstance(this.sprite, offset), vect(this.latest), this.layer);
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
