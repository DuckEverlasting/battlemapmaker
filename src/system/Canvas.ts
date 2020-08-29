import { DisplayCanvas } from "../types";
import { getOffscreenCanvas } from "../util/helpers";

export class Canvas {
  public readonly ctx: CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D;
  public readonly element: DisplayCanvas;
  
  constructor(containingElement: HTMLElement | "offscreen", width?: number, height?: number) {
    let canvas;
    if (containingElement === "offscreen") {
      if (!width || !height) {
        throw new Error("Canvas must have containing element or width and height");
      } 
      canvas = getOffscreenCanvas(width, height);
    } else {
      canvas = document.createElement('canvas');
      canvas.className = "layer-canvas";
      canvas.width = containingElement.clientWidth;
      canvas.height = containingElement.clientHeight;
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
