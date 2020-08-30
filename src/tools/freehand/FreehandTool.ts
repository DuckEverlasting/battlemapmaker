import { FreehandType } from "./FreehandType";
import { Sprite } from "../../graphics";

export class FreehandTool extends FreehandType {
  private sprite: Sprite | null;
  private layer: number | null;

  commitStart() {
    this.sprite = this.app.getState().activeSprite.copy();
    this.layer = this.app.getState().activeLayer;
    this.app.getDisplay().setStagingPosition(this.layer);
    this.sprite.render(this.app.getDisplay(), {
      tile: this.latest[0],
      layer: this.app.getState().activeLayer,
      staging: true
    });
  }

  commitUpdate() {
    this.latest.forEach(vector => {
      this.sprite.render(this.app.getDisplay(), {
        tile: vector,
        layer: this.layer,
        staging: true
      });
    })
    this.app.getDisplay().print();
  }

  commitEnd() {

    this.app.getDisplay().setStagingPosition(null);
    this.app.getDisplay().print();
    this.reset();
  }

  reset() {
    this.latest = [];
    this.layer = null;
    this.sprite = null;
  }
}
