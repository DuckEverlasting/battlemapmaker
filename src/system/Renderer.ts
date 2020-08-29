import { Display } from "./Display";
import { RenderQueue } from "./RenderQueue";
import { App } from ".";
import { getRange } from "../util/helpers";

export class Renderer {
  private display: Display;
  private queue: RenderQueue;
  private frameRate: number;
  private lastRender: number;

  constructor(app: App) {
    this.display = app.getDisplay();
    this.queue = app.getQueue();
    this.frameRate = 1000 / 60;
    this.render();
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  renderLoop() {
    const toRender = this.queue.getMarkedForRender();
    if (
      toRender.size > 0
      && Date.now() - this.lastRender > this.frameRate
    ) {
      this.render(toRender);
    }
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  render(layers?: Set<number>) {
    if (!layers) {
      layers = new Set(getRange(0, this.display.layerCount))
    }
    this.lastRender = Date.now();
    this.queue.render(this.display, layers);
    this.display.print();
    this.queue.clearAllMarkedForRender();
  }
}
