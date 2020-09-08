import { MenuItem, MenuItemType } from "./MenuItem";
import { Menu } from "./Menu";
import { vect } from "../util/Vector";

export class MenuBranch extends MenuItem implements MenuItemType {
  public active = false;

  constructor(
    name: string,
    public child: Menu,
    public childPosition:
      | ["right", "top"]
      | ["right", "bottom"]
      | ["left", "top"]
      | ["left", "bottom"] = ["right", "top"]
  ) {
    super(name);
    this.addTextNode(">");
    this.element.className = "menu-branch";
    this.child.element = this.element;
    this.child.initialize();
    this.element.onclick = (e) => {
      this.open();
      e.stopPropagation();
    }
    this.element.onmouseenter = e => {
      setTimeout(() => {
        if (!this.active) {
          this.open();
        }
      }, 300)
    };
  }

  open() {
    this.parent.closeAll();
    this.child.setPosition(this.getChildVector());
    this.element.appendChild(this.child.element);
    this.active = true;
  }

  close() {
    if (this.active) {
      this.child.closeAll();
      this.element.removeChild(this.child.element);
      this.active = false;
    }
  }

  getChildVector() {
    return vect(
      this.childPosition[0] === "right" ? this.element.clientWidth : 0,
      this.childPosition[1] === "bottom" ? this.element.clientHeight : 0
    )
  }
}
