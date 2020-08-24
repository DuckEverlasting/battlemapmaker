import App from "../system/App";
import Display from "../system/Display";

export default class MouseEmitter {
  app: App;
  target: HTMLCanvasElement;

  constructor(app: App, display: Display) {
    this.app = app;
    this.target = display.canvas.element;
    this.target.addEventListener("mousedown", this.handleMouseDown);
    this.target.addEventListener("mouseup", this.handleMouseUp);
    this.target.addEventListener("mousemove", this.handleMouseMove);
    this.target.addEventListener("onwheel", this.handleMouseMove);
  }

  handleMouseDown(e: MouseEvent) {
    this.app.inputHandler.mouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.app.inputHandler.mouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    this.app.inputHandler.mouseMove(e);
  }

  destroy() {
    this.target.removeEventListener("mousedown", this.handleMouseDown);
    this.target.removeEventListener("mouseup", this.handleMouseUp);
    this.target.removeEventListener("mousemove", this.handleMouseUp);
  }
}