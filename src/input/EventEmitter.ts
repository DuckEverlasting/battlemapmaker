import { Display } from "../system/Display";
import { InputHandler } from "./InputHandler";

export class EventEmitter {
  target: HTMLElement;

  constructor(private handler: InputHandler, display: Display, buttons: {
    toolButtons: {[key: string]: HTMLElement},
    layerButtons: HTMLElement[],
    palleteButtons: HTMLElement[],
  }) {
    this.target = display.containingElement;
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.target.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.target.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.target.addEventListener("mouseout", this.handleMouseOut.bind(this));
    this.target.addEventListener("wheel", this.handleMouseWheel.bind(this));
    this.target.addEventListener("contextmenu", this.handleContextMenu.bind(this));

    const toolButtonsArray = Object.entries(buttons.toolButtons);
    toolButtonsArray.forEach((entry, i) => {
      entry[1].onclick = () => this.handleToolButtonClick(toolButtonsArray, i);
    });

    buttons.layerButtons.forEach((element, i) => {
      element.onclick = () => this.handleLayerButtonClick(buttons.layerButtons, i);
    });

    buttons.palleteButtons.forEach((element, i) => {
      element.onclick = () => this.handlePalleteButtonClick(element, i);
    });
  }

  handleToolButtonClick(array: [string, HTMLElement][], index: number) {
    this.handler.toolButtonClick(array, index);
  }

  handleLayerButtonClick(array: HTMLElement[], index: number) {
    this.handler.layerButtonClick(array, index);
  }

  handlePalleteButtonClick(element: HTMLElement, index: number) {
    this.handler.palleteButtonClick(element, index);
  }

  handleKeyDown(e: KeyboardEvent) {
    this.handler.keyDown(e);
  }

  handleMouseDown(e: MouseEvent) {
    this.handler.mouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.handler.mouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    this.handler.mouseMove(e);
  }

  handleMouseOut(e: MouseEvent) {
    this.handler.mouseOut(e);
  }

  handleMouseWheel(e: WheelEvent) {
    this.handler.mouseWheel(e);
  }

  handleContextMenu(e: MouseEvent) {
    e.preventDefault(); 
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.removeEventListener("mousedown", this.handleMouseDown.bind(this));
    this.target.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    this.target.removeEventListener("mousemove", this.handleMouseUp.bind(this));
    this.target.removeEventListener("wheel", this.handleMouseWheel.bind(this));
    this.target.removeEventListener("contextmenu", this.handleContextMenu.bind(this));
  }
}