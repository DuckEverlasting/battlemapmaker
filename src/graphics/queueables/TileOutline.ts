import { Sprite } from "..";
import { State, Display } from "../../system";
import { Queueable, Renderable, QueueableFlag } from "../../types";
import { Vector } from "../../util/Vector";

export class TileOutline implements Queueable {
  public readonly id: string = `${Date.now()}`;
  private flags: QueueableFlag[] = ["updateOnTileChange"];
  private markedForRender: boolean = false;
  private tile = new Vector(-1, -1);

  constructor(private sprite: Sprite, private layer: number) {}

  render(display: Display) {
    this.sprite.render(display, {tile: this.tile, layer: this.layer})
  }

  update(state: State) {
    this.tile = new Vector(state.cursorTile);
    this.markedForRender = true;
  }

  getPosition() {
    return new Vector(this.tile);
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