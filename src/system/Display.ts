import { Canvas } from "./Canvas";
import { State } from "./";
import { LAYER } from "../enums";

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
    for (let i = 0; i <= this.state.activeLayer; i++) {
      if (this.layers[i].opacity !== 1) {
        this.main.ctx.globalAlpha = this.layers[i].opacity;
      }
      this.main.ctx.drawImage(
        this.layers[i].element,
        t.rect.offsetX,
        t.rect.offsetY
      );
      this.main.ctx.globalAlpha = 1;
    }
    if (this.state.activeLayer < this.effectLayersAt - 1) {
      this.transparent.ctx.clearRect(
        0, 0,
        this.transparent.element.width,
        this.transparent.element.height
      )
      for (let i = this.state.activeLayer + 1; i < this.effectLayersAt; i++) {
        if (this.layers[i].opacity !== 1) {
          this.transparent.ctx.globalAlpha = this.layers[i].opacity;
        }
        this.transparent.ctx.drawImage(
          this.layers[i].element, 0, 0
        );
        this.transparent.ctx.globalAlpha = 1;
      }
      this.main.ctx.globalAlpha = .5;
      this.main.ctx.drawImage(
        this.transparent.element,
        t.rect.offsetX,
        t.rect.offsetY
      );
      this.main.ctx.globalAlpha = 1;
    }
    for (let i = this.effectLayersAt; i < this.layerCount; i++) {
      this.main.ctx.drawImage(this.layers[i].element, 0, 0);
    }
  }

  clearLayer(layer: number) {
    this.layers[layer].ctx.clearRect(
      0, 0,
      this.layers[layer].element.width,
      this.layers[layer].element.height
    )
  }

  resize(width: number, height: number, includeEffectLayers = false) {
    for (let i = 0; i < (includeEffectLayers ? this.layerCount : this.effectLayersAt); i++) {
      this.layers[i].resize(width, height);
    }
    if (includeEffectLayers) {
      this.main.resize(width, height);
    }
  }

  getTranslateData() {
    return this.state.getTranslateData();
  }
}
