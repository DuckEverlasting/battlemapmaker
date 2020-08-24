import Canvas from "./Canvas";

export default class Display {
  public canvas: Canvas;
  
  constructor(containingElement: HTMLElement) {
    this.canvas = new Canvas(containingElement.clientHeight, containingElement.clientHeight);
    containingElement.appendChild(this.canvas.ctx.canvas);
  }
}