import { Canvas } from "./Canvas";
import { State } from "./State";
import { TranslateData } from "../types";

export class Display {
  public readonly id: string;
  private main: Canvas;
  private layers: Canvas[];

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
      this.layers[i] = (new Canvas("offscreen", this.state.rect.width, this.state.rect.height));
    }
    this.main = new Canvas(containingElement)
    this.state = state;
  }

  getLayers() {
    return [...this.layers];
  }

  print() {
    const t = this.state.getTranslateData();
    this.layers.forEach(layer => {
      this.main.ctx.drawImage(layer.element, t.rect.offsetX, t.rect.offsetY);
    });
  }

  clearLayer(number: number) {
    this.layers[number].ctx.clearRect(0, 0, this.containingElement.clientWidth, this.containingElement.clientHeight)
  }

  getTranslateData() {
    return this.state.getTranslateData();
  }
}
