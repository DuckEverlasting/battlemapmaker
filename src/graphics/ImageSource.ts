export class ImageSource {
  public readonly source: HTMLImageElement;
  public readonly width: number;
  public readonly height: number;

  constructor(source: HTMLImageElement) {
    this.source = source;
    this.width = source.width;
    this.height = source.height;
  }
}