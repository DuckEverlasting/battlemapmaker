import { MenuItem, MenuItemType } from "./MenuItem";
import { Menu } from "./Menu";
import { Vector, vect } from "../util/Vector";

export class MenuBranch extends MenuItem implements MenuItemType {
  public active = false;

  constructor(
    name: string,
    public parent: Menu,
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
    this.element.onmouseenter = (e) => {
      this.parent.closeAll();
      this.child.setPosition(this.getChildVector());
      this.element.appendChild(this.child.element);
      this.active = true;
    };
  }

  close() {
    if (this.active) {
      this.child.closeAll();
      this.element.removeChild(this.child.element);
      this.active = false;
    }
  }

  getChildVector() {
    const rect = this.element.getBoundingClientRect();
    if (this.childPosition[0] === "right") {
      if (this.childPosition[1] === "top") {
        return vect(rect.right, rect.top);
      } else {
        return vect(rect.right, rect.bottom);
      }
    } else {
      if (this.childPosition[1] === "top") {
        return vect(rect.left, rect.top);
      } else {
        return vect(rect.left, rect.bottom);
      }
    }
  }
}
