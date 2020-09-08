import { Display } from "../system/Display";
import { InputHandler } from "./InputHandler";
import { buildMenu } from "../util/buildMenu";
import { MenuHandler } from "../menu";
import { App } from "../system";

export class EventHandler {
  private inputHandler: InputHandler;
  target: HTMLElement;

  constructor(app: App, buttons: {
    toolButtons: {[key: string]: HTMLElement},
    layerButtons: HTMLElement[],
    palleteButtons: HTMLElement[],
    menuButtons: {[key: string]: HTMLElement},
    menuHandler: MenuHandler
  }) {
    this.inputHandler = app.getInputHandler();
    this.target = app.getDisplay().containingElement;
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

    buildMenu(app, buttons.menuButtons, buttons.menuHandler);
  }

  handleToolButtonClick(array: [string, HTMLElement][], index: number) {
    this.inputHandler.toolButtonClick(array, index);
  }

  handleLayerButtonClick(array: HTMLElement[], index: number) {
    this.inputHandler.layerButtonClick(array, index);
  }

  handlePalleteButtonClick(element: HTMLElement, index: number) {
    this.inputHandler.palleteButtonClick(element, index);
  }

  handleKeyDown(e: KeyboardEvent) {
    this.inputHandler.keyDown(e);
  }

  handleMouseDown(e: MouseEvent) {
    this.inputHandler.mouseDown(e);
  }

  handleMouseUp(e: MouseEvent) {
    this.inputHandler.mouseUp(e);
  }

  handleMouseMove(e: MouseEvent) {
    this.inputHandler.mouseMove(e);
  }

  handleMouseOut(e: MouseEvent) {
    this.inputHandler.mouseOut(e);
  }

  handleMouseWheel(e: WheelEvent) {
    this.inputHandler.mouseWheel(e);
  }

  handleContextMenu(e: MouseEvent) {
    e.preventDefault(); 
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    this.target.removeEventListener("mousedown", this.handleMouseDown.bind(this));
    this.target.removeEventListener("mouseup", this.handleMouseUp.bind(this));
    this.target.removeEventListener("mousemove", this.handleMouseUp.bind(this));
    this.target.removeEventListener("mouseout", this.handleMouseOut.bind(this));
    this.target.removeEventListener("wheel", this.handleMouseWheel.bind(this));
    this.target.removeEventListener("contextmenu", this.handleContextMenu.bind(this));
  }
}