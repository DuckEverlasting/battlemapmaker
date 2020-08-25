import { Canvas } from "./Canvas";
import { Renderable } from "../types";
import { State } from "./State";
import { Vector } from "../util/Vector";
import { ImageSource } from "../graphics";

export class Display implements Renderable {
  public readonly id: string;
  public readonly layers: Canvas[];
  public readonly layerCount: number;
  public readonly containingElement: HTMLElement;
  private state: State;

  constructor(state: State, containingElement: HTMLElement, layerCount: number) {
    this.id = "_DISPLAY_";
    this.containingElement = containingElement;
    this.layerCount = layerCount;
    this.layers = new Array(layerCount);
    for (let i = 0; i <= this.layerCount; i++) {
      this.layers[i] = (new Canvas(containingElement));
    }
    this.state = state;
  }

  clearLayer(number: number) {
    this.layers[number].ctx.clearRect(0, 0, this.containingElement.clientWidth, this.containingElement.clientHeight)
  }

  render() {
    const t = this.state.getTranslateData();
    this.layers[0].ctx.fillStyle = "rgb(150, 180, 245)";
    this.layers[0].ctx.fillRect(t.offsetX, t.offsetY, t.width, t.height);
  }

  renderAt(source: ImageSource, layer: number, position: Vector) {
    const t = this.state.getTranslateData();
    if (
      position.x < 0
      || position.x >= t.width / t.tileWidth
      || position.y < 0
      || position.y >= t.height / t.tileHeight
    ) {
      return;
    }
    this.layers[layer].ctx.drawImage(
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
