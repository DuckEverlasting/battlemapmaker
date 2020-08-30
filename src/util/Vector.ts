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
      this.x = Math.round(a);
      this.y = Math.round(b);
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

  distanceFrom(v: Vector) {
    return Math.max(Math.abs(this.x - v.x), Math.abs(this.y - v.y));
  }

  lineTo(v: Vector) {
    if (this.equals(v)) {return [];}
    function lerp(a: number, b: number, t: number) {
      return a + t * (b - a);
    }
    const vectors = new Array<Vector>(this.distanceFrom(v));
    for (let i = 0; i < vectors.length; i++) {
        const t = i / vectors.length;
        vectors.push(new Vector(
          lerp(this.x, v.x, t),
          lerp(this.y, v.y, t)
        ));
    }
    return vectors;
  }

  toString() {
    return `${this.x}_${this.y}`;
  }
}
