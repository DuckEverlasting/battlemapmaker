import { MenuItem } from "./MenuItem";
import { Vector } from "../util/Vector";

export class Menu {
  constructor(
    public readonly name: string,
    public element: HTMLElement,
    private items: MenuItem[]
  ) {
    this.element = document.createElement("div");
    this.element.className = "menu";
    this.items.forEach(item => {
      item.appendTo(this.element);
    });
  }

  setPosition(v: Vector) {
    const maxX = Math.min(0, window.innerWidth - this.element.clientWidth);
    const maxY = Math.min(0, window.innerHeight - this.element.clientHeight);
    this.element.style.left = Math.max(v.x, maxX) + "px";
    this.element.style.top = Math.max(v.y, maxY) + "px";
  }

  closeAll() {
    this.items.forEach(item => item.close());
  }
}
