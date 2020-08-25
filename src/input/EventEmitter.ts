import { Display } from "../system/Display";
import { InputHandler } from "./InputHandler";

export class EventEmitter {
  handler: InputHandler;
  target: HTMLElement;

  constructor(handler: InputHandler, display: Display) {
    this.handler = handler;
    this.target = display.containingElement;
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.target.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.target.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.target.addEventListener("onwheel", this.handleMouseMove.bind(this));
  }

  handleKeyDown(e: KeyboardEvent) {
    this.handler.keyDown(e);
  }

  handleMouseDown(e: MouseEvent) {
    this.handler.mouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.handler.mouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    this.handler.mouseMove(e);
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.removeEventListener("mousedown", this.handleMouseDown.bind(this));
    this.target.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    this.target.removeEventListener("mousemove", this.handleMouseUp.bind(this));
  }
}