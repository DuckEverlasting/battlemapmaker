import { Sprite, ImageSource } from "..";
import { State, Display, Canvas, App } from "../../system";
import { QueueableFlag } from "../../types";
import { Vector } from "../../util/Vector";
import { Queueable } from "./Queueable";
import { LAYER } from "../../enums";

export class TileOutline extends Queueable {
  protected flags: QueueableFlag[] = ["updateOnTileChange"];
  private markedForRender: boolean = false; // Does not render until triggered
  private tile = new Vector(-1, -1);
  private layer = LAYER.EFFECT_2;
  private sprite: Sprite;

  constructor(app: App, style?: string, width?: number) {
    super(new Set([LAYER.EFFECT_2]));
    const outline = new Canvas("offscreen", app.getState().tileWidth, app.getState().tileHeight);
    outline.ctx.strokeStyle = style || "black";
    outline.ctx.lineWidth = width ? width * 2 : 4;
    outline.ctx.strokeRect(0, 0, outline.element.width, outline.element.height);
    
    const outlineSource = new ImageSource(outline.element);
    this.sprite = new Sprite(outlineSource);
  }

  render(display: Display, props: {layer: number}) {
    if (this.layer !== props.layer) {return;}
    this.sprite.render(display, {
      tile: this.tile,
      layer: this.layer
    })
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