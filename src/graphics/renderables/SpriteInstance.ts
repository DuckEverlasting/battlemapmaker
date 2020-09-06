import { Sprite, Autotile } from "../";

export class SpriteInstance {
  public readonly id: string;

  constructor(public readonly sprite: Sprite | Autotile) {
    this.sprite = sprite;
    this.id = `${Math.random()}`;
  }
}