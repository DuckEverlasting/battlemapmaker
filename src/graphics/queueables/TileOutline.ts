import { Sprite } from "..";
import { State, Display } from "../../system";
import { QueueableFlag } from "../../types";
import { Vector } from "../../util/Vector";
import { Queueable } from "./Queueable";

export class TileOutline extends Queueable {
  protected flags: QueueableFlag[] = ["updateOnTileChange"];
  private markedForRender: boolean = false; // Does not render until triggered
  private tile = new Vector(-1, -1);

  constructor(private sprite: Sprite, private layer: number) {
    super(new Set([layer]));
  }

  render(display: Display, props: {layer: number}) {
    if (this.layer !== props.layer) {return;}
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

  isMarkedForRender() {
    return this.markedForRender ? new Set([this.layer]) : new Set<number>();
  }

  getFlags() {
    return [...this.flags]
  }
}