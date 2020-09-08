import { MenuItem } from "./MenuItem";
import { Vector } from "../util/Vector";

export class Menu {
  constructor(
    public readonly name: string,
    private children: MenuItem[],
    public element?: HTMLElement
  ) {
    if (element) {
      this.initialize();
    }
  }

  initialize() {
    this.element = document.createElement("div");
    this.element.className = "menu";
    this.children.forEach(child => {
      child.parent = this;
      child.appendTo(this.element);
    });
  }

  setPosition(v: Vector) {
    const maxX = Math.min(0, window.innerWidth - this.element.clientWidth);
    const maxY = Math.min(0, window.innerHeight - this.element.clientHeight);
    this.element.style.left = Math.max(v.x, maxX) + "px";
    this.element.style.top = Math.max(v.y, maxY) + "px";
  }

  closeAll() {
    this.children.forEach(child => child.close());
  }
}
