import { Menu } from "./Menu";

export interface MenuItemType {
  name: string;
  element: HTMLElement;
  parent: Menu;
  appendTo(containingElement: HTMLElement): void;
}

export abstract class MenuItem implements MenuItemType {
  public element: HTMLElement;
  public parent: Menu;

  constructor(
    public name: string,
  ) {
    this.element = document.createElement("div");
    this.addTextNode(this.name);
  }

  appendTo(containingElement: HTMLElement): void {
    containingElement.appendChild(this.element);
  }

  addTextNode(text: string) {
    const span = document.createElement("span"),
      t = document.createTextNode(text);
    span.appendChild(t);
    this.element.appendChild(span);
  }

  close() {}
}