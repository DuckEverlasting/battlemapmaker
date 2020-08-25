import { Display } from "./Display";
import { RenderQueue } from "./RenderQueue";
import { App } from ".";

export class Renderer {
  // contains a RenderQueue.
  // when triggered, calls render for each item in RenderQueue
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
    if (
      !this.queue.isEmpty()
      && Date.now() - this.lastRender > this.frameRate
    ) {
      this.render();
    }
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  render() {
    this.lastRender = Date.now();
    this.queue.getMarkedForRender().forEach((layer, i) => {
      if (layer === null) {return;}
      layer.forEach(renderable => {
        this.display.clearLayer(i);
        renderable.render(this.display);
      });
    });
    this.queue.clearMarkedForRender();
  }
}
