import { Canvas } from "./Canvas";
import { Renderable } from "../types";
import { State } from "./State";
import { Vector } from "../util/Vector";
import { ImageSource, Sprite } from "../graphics";

export class Display implements Renderable {
  public readonly id: string;
  public readonly layers: Canvas[];

  constructor(
    private state: State,
    public readonly containingElement: HTMLElement,
    public readonly layerCount: number
  ) {
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
    const rect = this.state.getTranslateData().rect;
    this.layers[0].ctx.fillStyle = "rgb(150, 180, 245)";
    this.layers[0].ctx.fillRect(rect.offsetX, rect.offsetY, rect.width, rect.height);
  }

  renderSprite(sprite: Sprite) {
    const t = this.state.getTranslateData(),
      position = sprite.getPosition(),
      layer = sprite.getLayer();
    if (
      position.x < 0
      || position.x >= t.rect.width / t.tileWidth
      || position.y < 0
      || position.y >= t.rect.height / t.tileHeight
    ) {
      return;
    }
    this.layers[layer].ctx.drawImage(
      sprite.imageSource.source,
      sprite.rect.offsetX,
      sprite.rect.offsetY,
      sprite.rect.width,
      sprite.rect.height,
      t.rect.offsetX + (position.x) * t.tileWidth,
      t.rect.offsetY + (position.y) * t.tileHeight,
      t.tileWidth,
      t.tileHeight
    );
  }
}
