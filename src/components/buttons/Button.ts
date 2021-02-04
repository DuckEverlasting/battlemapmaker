import { State } from "../../system";
import { Observer } from "../../types";

export abstract class Button implements Observer {
  protected element: HTMLButtonElement;
  public subscriptions: string[] = [];

  constructor(
    containingElement: HTMLElement,
    text: string,
    className?: string
  ) {
    this.element = document.createElement("button");
    this.element.className = className;
    this.element.textContent = text;
    this.element.onclick = this.onClick;
    containingElement.appendChild(this.element);
  }

  onClick(ev: MouseEvent) {}

  update(state: State) {}

  destroy() {
    this.element.parentElement.removeChild(this.element);
  }
}
