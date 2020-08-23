class Vector {
  public x: number;
  public y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
}
