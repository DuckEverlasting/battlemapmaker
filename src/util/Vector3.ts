import { Vector } from "./Vector";

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  
  constructor(a: number|Vector3|string, b?: number, c?: number) {
    if (a instanceof Vector3) {
      this.x = a.x;
      this.y = a.y;
      this.z = a.z;
    } else if (typeof a === "string") {
      const [x, y, z] = a.split("_");
      this.x = parseInt(x);
      this.y = parseInt(y);
      this.z = parseInt(z);
    } else {
      this.x = Math.round(a);
      this.y = Math.round(b);
      this.z = Math.round(c);

    }
  }

  equals(v: Vector3) {
    if (v === null) {return false;}
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  vec() {
    return new Vector(this.x, this.y);
  }

  toString() {
    return `${this.x}_${this.y}_${this.z}`;
  }
}

export function vect3(a: number|Vector3|string, b?: number, c?: number) {
  return new Vector3(a, b, c);
}