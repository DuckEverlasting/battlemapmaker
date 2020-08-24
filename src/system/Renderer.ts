import Display from "./Display";
import RenderQueue from "./RenderQueue";

export default class Renderer {
  // contains a RenderQueue.
  // when triggered, calls render for each item in RenderQueue
  private display: Display;
  private queue: RenderQueue;
  private isRendering: boolean = false;
  private frame: number = 0;

  constructor(display: Display) {
    this.display = display;
    this.queue = new RenderQueue();
  }

  start() {
    if (this.isRendering) {
      throw new Error("Renderer is already running.")
    }
    this.isRendering = true;
    this.frame = requestAnimationFrame(() => {
      this.queue.array.forEach(renderable => {
        renderable.render();
      })
    });
  }

  end() {
    if (!this.isRendering) {
      throw new Error("Renderer is not running.")
    }
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.isRendering = false;
  }
}