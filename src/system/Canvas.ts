import { DisplayCanvas } from "../types";

export class Canvas {
  public ctx: CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D;
  public element: DisplayCanvas;
  
  constructor(containingElement: HTMLElement, offscreen?: "offscreen") {
    const { clientWidth: width, clientHeight: height } = containingElement;
    let canvas;
    if (!!offscreen && typeof OffscreenCanvas !== 'undefined') { 
      canvas = new OffscreenCanvas(width, height);
    } else {
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = width;
      containingElement.appendChild(canvas);
    }
    this.element = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }

  resize(width?: number, height?: number) {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }
}
