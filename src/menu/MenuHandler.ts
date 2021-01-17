import { Menu } from "./Menu";
import { Vector } from "../util/Vector";
import { App } from "../system";

export class MenuHandler {
  private currentMenu: Menu = null;

  constructor(private app: App, private element: HTMLElement) {
    element.onclick = () => {
      this.clearMenu();
    }
  }

  loadMenu(menu: Menu, target: Vector) {
    this.clearMenu();
    menu.setPosition(target);
    this.element.appendChild(menu.element);
    this.element.style.zIndex = "1";
    this.currentMenu = menu;
  }

  clearMenu() {
    if (this.currentMenu !== null) {
      this.element.removeChild(this.currentMenu.element);
      this.currentMenu = null;
      this.element.style.zIndex = "inherit";
    }
  }
}