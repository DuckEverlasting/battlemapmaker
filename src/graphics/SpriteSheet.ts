import { ImageSource } from "./ImageSource";
import { Sprite } from ".";

export class SpriteSheet extends ImageSource {
  public readonly spriteWidth: number;
  public readonly spriteHeight: number;
  public readonly rows: number;
  public readonly columns: number;
  public readonly sprites: Sprite[];

  constructor(source: HTMLImageElement, spriteWidth: number, spriteHeight: number) {
    super(source);
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.rows = Math.floor(this.height / spriteHeight);
    this.columns = Math.floor(this.width / spriteWidth);
    this.sprites = this.generateSprites()
  }

  generateSprites() {
    const array: Sprite[] = []
    return array;
  }
}