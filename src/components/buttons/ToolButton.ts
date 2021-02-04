import { State } from "../../system";
import { Button } from "./";
import styles from "./toolButton.module.css";

export class ToolButton extends Button {
  public active = false;

  constructor(containingElement: HTMLElement, public readonly name: string) {
    super(containingElement, name);
    this.element.style.textTransform = "capitalize";
  }

  onClick() {

  }

  update(state: State) {
    if (this.active && state.activeTool.name !== this.name) {
      this.setInactive();
    } else if (this.active && state.activeTool.name !== this.name) {
      this.setActive();
    }
  }

  setActive() {
    this.active = false;
    this.element.classList.add(styles.active);
    this.element.blur();
  }

  setInactive() {
    this.active = false;
    this.element.classList.remove(styles.active);
    this.element.blur();
  }
}
