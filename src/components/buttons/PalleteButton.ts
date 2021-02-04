import { App, Canvas, State } from "../../system";
import { Button } from "./Button";

export class PalleteButton extends Button {
  public active = false;
  private canvas: Canvas;

  constructor(private app: App, containingElement: HTMLElement, public index: number) {
    super(containingElement, "");
    this.element.style.textTransform = "capitalize";
    this.canvas = new Canvas(this.element);
    this.subscriptions.push("palleteChange");
  }

  onClick(_ev: MouseEvent) {
    this.element.blur();
    this.app.getState().setActiveSprite(this.index);
  }

  update(state: State) {
    
  }
}
