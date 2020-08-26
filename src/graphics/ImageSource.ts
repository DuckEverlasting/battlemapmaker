import { CanvasSource } from "../types";
import { Rect } from "../util/Rect";

export class ImageSource {
  public readonly id: string;
  public readonly source: CanvasSource;
  public readonly rect: Rect;

  constructor(
    source: CanvasSource,
    rect: Rect = new Rect(0, 0, source.width, source.height)
  ) {
    console.log(source);
    this.source = source;
    this.rect = rect;
  }
}