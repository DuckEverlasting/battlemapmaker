import { Menu } from "./Menu";
import { Vector } from "../util/Vector";

class MenuHandler {
  private currentMenu: Menu;

  constructor(private element: HTMLElement) {
    element.onclick = e => {
      this.clearMenu();
    }
  }

  loadMenu(menu: Menu, target: Vector) {
    this.clearMenu();
    menu.setPosition(target);
    this.element.appendChild(menu.element);
    this.currentMenu = menu;
  }

  clearMenu() {
    this.element.removeChild(this.currentMenu.element);
    this.currentMenu = null;
  }
}