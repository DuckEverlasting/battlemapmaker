import { Sprite } from "../";

export class SpriteInstance extends Sprite {
  public readonly spriteId: string;

  constructor(sprite: Sprite) {
    super(
      sprite.imageSource,
      sprite.type,
      sprite.rect,
      sprite.widthInTiles,
      sprite.heightInTiles
    );
    this.spriteId = sprite.id;
  }
}