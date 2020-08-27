import { Sprite, ImageSource } from ".";
import { State } from "../system";
import { Queueable, Renderable, QueueableFlag } from "../types";

export class TileOutline extends Sprite implements Queueable {
  private flags: QueueableFlag[] = ["updateOnTileChange"];
  private markedForRender: boolean;
  
  update(state: State) {
    this.moveToTile(state.cursorTile);
    this.markedForRender = true;
  }

  clearMarkedForRender() {
    this.markedForRender = false;
  }

  getMarkedForRender() {
    const renderSet = new Set<Renderable>();
    if (this.markedForRender) {
      renderSet.add(this);
    }
    return {
      layer: this.layer,
      set: renderSet
    }
  }

  getFlags() {
    return [...this.flags]
  }
}