import { Canvas } from "./Canvas";
import { State } from "./";

export class Display {
  public readonly id: string;
  public mainMarkedForRender = false;
  private main: Canvas;
  private transparent: Canvas;
  private layers: Canvas[];

  constructor(
    private state: State,
    public readonly containingElement: HTMLElement,
    public readonly layerCount: number,
    public readonly effectLayersAt: number
  ) {
    this.id = '_DISPLAY_';
    this.containingElement = containingElement;
    this.layers = new Array(this.layerCount);
    for (let i = 0; i < this.effectLayersAt; i++) {
      this.layers[i] = new Canvas(
        'offscreen',
        this.state.rect.width,
        this.state.rect.height
      );
    }
    for (let i = this.effectLayersAt; i < this.layerCount; i++) {
      this.layers[i] = new Canvas(
        'offscreen',
        this.containingElement.clientWidth,
        this.containingElement.clientHeight
      );
    }
    this.main = new Canvas(containingElement);
    this.transparent = new Canvas(
      'offscreen',
      this.state.rect.width,
      this.state.rect.height
    );
    this.transparent.opacity = .5;
    this.state = state;
    this.state.displayWidth = this.main.element.width;
    this.state.displayHeight = this.main.element.height;
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
      this.main.clear();
      this.mainMarkedForRender = false;
    }
    for (let i = 0; i <= this.state.activeLayer; i++) {
      this.layers[i].printTo(this.main, t.rect.offsetX + t.marginLeft, t.rect.offsetY + t.marginTop, t.zoom);
    }
    if (this.state.activeLayer < this.effectLayersAt - 1) {
      this.transparent.clear();
      for (let i = this.state.activeLayer + 1; i < this.effectLayersAt; i++) {
        this.layers[i].printTo(this.transparent);
      }
      this.transparent.printTo(this.main, t.rect.offsetX + t.marginLeft, t.rect.offsetY + t.marginTop, t.zoom);
    }
    for (let i = this.effectLayersAt; i < this.layerCount; i++) {
      this.layers[i].printTo(this.main);
    }
  }

  clearLayer(layer: number) {
    this.layers[layer].clear();
  }

  resize(width: number, height: number, includeEffectLayers = false) {
    for (let i = 0; i < (includeEffectLayers ? this.layerCount : this.effectLayersAt); i++) {
      this.layers[i].resize(width, height);
    }
    if (includeEffectLayers) {
      this.main.resize(width, height);
      this.state.displayWidth = this.main.element.width;
      this.state.displayHeight = this.main.element.height;
    }
  }

  getTranslateData() {
    return this.state.getTranslateData();
  }
}
