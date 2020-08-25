import { Display } from "./Display";
import { RenderQueue } from "./RenderQueue";
import { Renderable } from "../types";
import { App } from ".";

export class Renderer {
  // contains a RenderQueue.
  // when triggered, calls render for each item in RenderQueue
  private display: Display;
  private queue: RenderQueue;
  private renderNeeded: boolean;
  private frameRate: number;
  private lastRender: number;

  constructor(app: App) {
    this.display = app.getDisplay();
    this.queue = new RenderQueue();
    this.frameRate = 1000 / 60;
    this.render();
    requestAnimationFrame(this.renderLoop.bind(this));
  }

  renderLoop() {
    if (
      !!this.renderNeeded
      && Date.now() - this.lastRender > this.frameRate
    ) {
      this.render();
    }
    requestAnimationFrame(this.renderLoop.bind(this))
  }

  render() {
    this.lastRender = Date.now();
    this.display.render();
    this.queue.array.forEach(renderable => {
      renderable.render(this.display);
    })
    this.renderNeeded = false;
  }

  enqueue(object: Renderable) {
    this.queue.add(object);
  }

  flagForRender() {
    if (!this.renderNeeded) {
      this.renderNeeded = true;
    }
  }
}