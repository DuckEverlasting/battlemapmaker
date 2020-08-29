export class Vector {
  public x: number;
  public y: number;
  
  constructor(a: number|Vector|string, b?: number) {
    if (a instanceof Vector) {
      this.x = a.x;
      this.y = a.y;
    } else if (typeof a === "string") {
      const [x, y] = a.split("_");
      this.x = parseInt(x);
      this.y = parseInt(y);
    } else {
      this.x = a;
      this.y = b;
    }
  }

  add(a: number|Vector, b?: number) {
    if (a instanceof Vector) {
      this.x += a.x;
      this.y += a.y;
    } else {
      this.x += a;
      this.y += b;
    }
    return this;
  }

  sub(a: number|Vector, b?: number) {
    if (a instanceof Vector) {
      this.x -= a.x;
      this.y -= a.y;
    } else {
      this.x -= a;
      this.y -= b;
    }
    return this;
  }

  equals(v: Vector) {
    return this.x === v.x && this.y === v.y
  }

  toString() {
    return `${this.x}_${this.y}`;
  }
}
