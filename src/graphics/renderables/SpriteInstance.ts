import { ISprite } from "../../types";
import { Vector, vect } from "../../util/Vector";

export class SpriteInstance {
  public readonly id: string;

  constructor(public readonly sprite: ISprite, public gridOffset: Vector = vect(0, 0)) {
    this.id = `${Math.random()}`;
  }
}