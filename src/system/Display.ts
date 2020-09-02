import { Canvas } from "./Canvas";
import { State } from "./";

export class Display {
  public readonly id: string;
  public mainMarkedForRender = false;
  private main: Canvas;
  private layers: Canvas[];

  constructor(
    private state: State,
    public readonly containingElement: HTMLElement,
    public readonly layerCount: number
  ) {
    this.id = '_DISPLAY_';
    this.containingElement = containingElement;
    this.layerCount = layerCount;
    this.layers = new Array(layerCount);
    for (let i = 0; i <= this.layerCount; i++) {
      this.layers[i] = new Canvas(
        'offscreen',
        this.state.rect.width,
        this.state.rect.height
      );
    }
    this.main = new Canvas(containingElement);
    this.state = state;
  }

  getLayers() {
    return [...this.layers];
  }

  getActiveLayer() {
    return this.state.activeLayer;
  }

  print() {
    const t = this.state.getTranslateData();
    if (this.mainMarkedForRender) {
      this.main.ctx.clearRect(
        0, 0,
        this.containingElement.clientWidth,
        this.containingElement.clientHeight
      )
      this.mainMarkedForRender = false;
    }
    this.layers.forEach((layer, i) => {
      if (layer.opacity !== 1) {
        this.main.ctx.globalAlpha = layer.opacity;
      }
      this.main.ctx.drawImage(
        layer.element,
        t.rect.offsetX,
        t.rect.offsetY
      );
      this.main.ctx.globalAlpha = 1;
    });
  }

  clearLayer(layer: number) {
    this.layers[layer].ctx.clearRect(
      0, 0,
      this.layers[layer].element.width,
      this.layers[layer].element.height
    )
  }

  getTranslateData() {
    return this.state.getTranslateData();
  }
}
