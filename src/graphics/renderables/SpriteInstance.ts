import { Sprite, Autotile } from "../";
import { Vector, vect } from "../../util/Vector";

export class SpriteInstance {
  public readonly id: string;

  constructor(public readonly sprite: Sprite | Autotile, public gridOffset: Vector = vect(0, 0)) {
    this.id = `${Math.random()}`;
  }
}