import { CanvasSource } from "../../types";
import { Rect } from "../../util/Rect";

export class ImageSource {
  public readonly id: string;

  constructor(
    public readonly source: CanvasSource,
    public readonly rect: Rect = new Rect(0, 0, source.width, source.height)
  ) {
    this.id = `${Date.now()}`;
  }
}
