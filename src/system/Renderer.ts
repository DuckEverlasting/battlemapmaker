import { Display } from "./Display";
import { RenderQueue } from "./RenderQueue";
import { App } from ".";
import { Renderable } from "../types";

export class Renderer {
  private display: Display;
  private queue: RenderQueue;
  private frameRate: number;
  private lastRender: number;

  constructor(app: App) {
    this.display = app.getDisplay();
    this.queue = app.getQueue();
    this.frameRate = 1000 / 60;
    this.render(this.queue.getAllMarkedForRender());
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  renderLoop() {
    const markedForRender = this.queue.getAllMarkedForRender();
    if (
      markedForRender.some(set => set.size > 0)
      && Date.now() - this.lastRender > this.frameRate
    ) {
      this.render(markedForRender);
    }
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  render(markedForRender: Set<Renderable>[]) {
    this.lastRender = Date.now();
    markedForRender.forEach((layer, i) => {
      if (layer === null) {return;}
      layer.forEach(renderable => {
        this.display.clearLayer(i);
        renderable.render(this.display);
      });
    });
    this.display.print();
    this.queue.clearAllMarkedForRender();
  }
}
