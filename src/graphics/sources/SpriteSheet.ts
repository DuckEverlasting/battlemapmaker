import { ImageSource } from "./ImageSource";
import { Sprite } from "..";
import { Rect } from "../../util/Rect";
import { SpriteMap } from "../../types";

export class SpriteSheet extends ImageSource {
  public readonly spriteWidth: number;
  public readonly spriteHeight: number;
  public readonly rows: number;
  public readonly columns: number;
  public readonly sprites: Sprite[];

  constructor(source: HTMLImageElement, spriteWidth: number, spriteHeight: number, map?: SpriteMap) {
    super(source);
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.rows = Math.floor(this.rect.height / spriteHeight);
    this.columns = Math.floor(this.rect.width / spriteWidth);
    this.sprites = map ? this.generateSpritesFromMap(map) : this.generateSprites();
  }

  generateSprites() {
    const array: Sprite[] = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        array.push(new Sprite(this, new Rect(
          j * this.spriteWidth,
          i * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight
        ), 1, 1));
      }
    }
    return array;
  }

  generateSpritesFromMap(map: SpriteMap) {
    const array: Sprite[] = [];
    map.forEach(sprite => {
      array.push(new Sprite(this, new Rect(
        sprite.row * this.spriteWidth,
        sprite.column * this.spriteHeight,
        sprite.width * this.spriteWidth,
        sprite.height * this.spriteHeight
      ), sprite.width, sprite.height));
    });
    return array;
  }
}