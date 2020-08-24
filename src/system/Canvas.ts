export default class Canvas {
  public ctx: CanvasRenderingContext2D;
  public element: HTMLCanvasElement;
  
  constructor(width: number, height: number) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.element = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }

  resize(width?: number, height?: number) {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  }
}
