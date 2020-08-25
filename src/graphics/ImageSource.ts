import { CanvasSource } from "../types";

export class ImageSource {
  public readonly id: string;
  public readonly source: CanvasSource;
  public readonly offsetX: number;
  public readonly offsetY: number;
  public readonly width: number;
  public readonly height: number;

  constructor(
    source: CanvasSource,
    offsetX: number=0,
    offsetY: number=0,
    width: number=source.width,
    height: number=source.height,
  ) {
    this.source = source;
    this.offsetX = Math.floor(offsetX);
    this.offsetY = Math.floor(offsetY);
    this.width = Math.floor(width);
    this.height = Math.floor(height);
  }
}