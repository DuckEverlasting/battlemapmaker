import { FreehandType } from "./FreehandType";
import { vect } from "../../util/Vector";

export class EraseTool extends FreehandType {
  protected writesToTileMap = true;

  commitStart() {
    this.tileMap.remove(vect(this.latest), this.layer);
  }

  commitUpdate() {
    this.tileMap.remove(vect(this.latest), this.layer);
  }

  commitEnd() {
    this.reset();
  }

  reset() {
    this.latest = null;
    this.layer = null;
  }
}