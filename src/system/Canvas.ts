import { DisplayCanvas } from "../types";
import { getOffscreenCanvas } from "../util/helpers";
import { Rect } from "../util/Rect";

export class Canvas {
  public readonly ctx: CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D;
  public readonly element: DisplayCanvas;
  public opacity: number = 1;
  
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
    this.element.width = width;
    this.element.height = height;
  }

  printTo(dest: Canvas, offX = 0, offY = 1, zoom = 1) {
    dest.ctx.globalAlpha = this.opacity;
    dest.ctx.drawImage(
      this.element,
      offX,
      offY,
      this.element.width * zoom,
      this.element.height * zoom,
    );
    dest.ctx.globalAlpha = 1;
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.element.width,
      this.element.height
    )
  }
}
