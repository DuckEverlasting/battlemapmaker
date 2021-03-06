import { Sprite, ImageSource } from "..";
import { State, Display, Canvas, App } from "../../system";
import { Subscription } from "../../types";
import { Vector, vect } from "../../util/Vector";
import { Queueable } from "./Queueable";
import { LAYER, SPRITE_TYPE } from "../../enums";

export class TileOutline extends Queueable {
  public subscriptions: Subscription[] = ["tileChange"];
  private markedForRender: boolean = false; // Does not render until triggered
  private tile: Vector = null;
  private layer = LAYER.EFFECT_TILEMAP;
  private sprite: Sprite;

  constructor(app: App, style?: string, width?: number) {
    super(new Set([LAYER.EFFECT_TILEMAP]));
    const outline = new Canvas("offscreen", app.getState().tileWidth, app.getState().tileHeight);
    outline.ctx.strokeStyle = style || "black";
    outline.ctx.lineWidth = width ? width * 2 : 4;
    outline.ctx.strokeRect(0, 0, outline.element.width, outline.element.height);
    
    const outlineSource = new ImageSource(outline.element);
    this.sprite = new Sprite(outlineSource, SPRITE_TYPE.EFFECT);
  }

  render(display: Display, props: {layer: number}) {
    if (this.layer !== props.layer) {return;}
    this.sprite.render(display, {
      tile: this.tile,
      layer: this.layer
    })
  }

  update(state: State) {
    this.tile = vect(state.cursorTile);
    this.markedForRender = true;
  }

  getTile() {
    return vect(this.tile);
  }

  clearMarkedForRender() {
    this.markedForRender = false;
  }

  isMarkedForRender() {
    return this.markedForRender ? [this.layer] : [];
  }
}