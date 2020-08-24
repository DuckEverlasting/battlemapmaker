import { Canvas } from "./Canvas";

export class Display {
  public canvas: Canvas;
  
  constructor(containingElement: HTMLElement) {
    this.canvas = new Canvas(containingElement.clientHeight, containingElement.clientHeight);
    containingElement.appendChild(this.canvas.ctx.canvas);
  }
}