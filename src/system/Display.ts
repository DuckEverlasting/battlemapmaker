import { Canvas } from "./Canvas";
import { Renderable } from "../types";
import { State } from "./State";
import { Vector } from "../util/Vector";
import { ImageSource } from "../graphics";

export class Display implements Renderable {
  public readonly id: string;
  public canvas: Canvas;
  private state: State;
  
  constructor(state: State, containingElement: HTMLElement) {
    this.id = "DISPLAY";
    this.canvas = new Canvas(containingElement);
    this.state = state;
  }

  render() {
    const t = this.state.getTranslateData();
    this.canvas.ctx.fillStyle = "rgb(150, 180, 245)";
    this.canvas.ctx.fillRect(t.offsetX, t.offsetY, t.width, t.height);
  }

  renderAt(source: ImageSource, position: Vector) {
    const t = this.state.getTranslateData();
    if (
      position.x < 0
      || position.x >= t.width / t.tileWidth
      || position.y < 0
      || position.y >= t.height / t.tileHeight
    ) {
      return;
    }
    this.canvas.ctx.drawImage(
      source.source,
      source.offsetX,
      source.offsetY,
      source.width,
      source.height,
      t.offsetX + (position.x) * t.tileWidth,
      t.offsetY + (position.y) * t.tileHeight,
      source.width,
      source.height
    );
  }
}
