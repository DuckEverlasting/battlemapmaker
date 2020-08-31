import { Canvas } from "./Canvas";
import { State } from "./";

export class Display {
  public readonly id: string;
  private main: Canvas;
  private layers: Canvas[];
  private staging: Canvas;
  private renderStagingAt: number | null = null;

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
    this.staging = new Canvas(
      'offscreen',
      this.state.rect.width,
      this.state.rect.height
    );
    this.state = state;
  }

  getLayers() {
    return [...this.layers];
  }

  getActiveLayer() {
    return this.state.activeLayer;
  }

  getStaging() {
    return this.staging;
  }

  setStagingPosition(num: number | null) {
    this.renderStagingAt = num;
  }

  print() {
    const t = this.state.getTranslateData();
    this.layers.forEach((layer, i) => {
      this.main.ctx.drawImage(
        layer.element,
        t.rect.offsetX,
        t.rect.offsetY
      );
      if (this.renderStagingAt === i) {
        console.log("STAAAAAAGING: ", i)
        this.main.ctx.drawImage(
          this.staging.element,
          t.rect.offsetX,
          t.rect.offsetY
        );
      }
    });
  }

  clearLayer(layer: number | "staging") {
    const ctx = layer === "staging"
      ? this.staging.ctx
      : this.layers[layer].ctx;
    ctx.clearRect(
      0, 0,
      this.containingElement.clientWidth,
      this.containingElement.clientHeight
    )
  }

  getTranslateData() {
    return this.state.getTranslateData();
  }
}
