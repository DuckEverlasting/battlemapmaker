import { FreehandType } from "./FreehandType";
import { vect } from "../../util/Vector";
import { App } from "../../system";

export class EraseTool extends FreehandType {
  protected writesToTileMap = true;

  constructor(app: App) {
    super(app);
    this.name = "erase";
  }

  commitStart() {
    this.app.getTileMap().remove(vect(this.latest), this.layer);
  }

  commitUpdate() {
    this.app.getTileMap().remove(vect(this.latest), this.layer);
  }

  commitEnd() {
    this.reset();
  }

  reset() {
    this.latest = null;
    this.layer = null;
  }
}