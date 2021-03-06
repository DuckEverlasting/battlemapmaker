import { App } from "../system/App";
import { MouseInput } from "../types";
import { parseMouseInput } from "./parseInput";
import { RenderQueue, State } from "../system";

export class InputHandler {
  private app: App;
  private queue: RenderQueue;
  private state: State;

  constructor(app: App) {
    this.app = app;
    this.queue = app.getQueue();
    this.state = app.getState();
  }

  toolButtonClick(array: [string, HTMLElement][], index: number) {
    const [ name, element ] = array[index];
    this.state.setActiveTool(name);
    array.forEach(en => {
      en[1].blur();
      en[1].classList.remove("active");
    });
    element.classList.add("active");
  }

  layerButtonClick(array: HTMLElement[], index: number) {
    this.state.setActiveLayer(index + 1)
    array.forEach(el => {
      el.blur();
      el.classList.remove("active");
    });
    array[index].classList.add("active");
    this.app.callRender();
  }

  palleteButtonClick(element: HTMLElement, index: number) {
    element.blur();
    this.state.setActiveSprite(index);
  }

  keyDown(e: KeyboardEvent) {
    console.log("KEYDOWN")
    this.state.keyboard.parseKeyDown(e);
    this.queue.triggerEvent("keyDown", this.state);
  }

  keyUp(e: KeyboardEvent) {
    this.state.keyboard.parseKeyUp(e);
    this.queue.triggerEvent("keyUp", this.state);
    console.log("KEYDOWN")
  }

  mouseDown(e: MouseEvent) {
    e.preventDefault();
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    if (e.button === 1) {
      this.state.middleClickTool.start(input);
    } else if (e.button === 0) {
      if (this.state.activeTool === null) {return;}
      this.state.activeTool.start(input);
    }
    this.queue.triggerEvent("click", this.state);
  }

  mouseMove(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    let tileChanged, tool = null;
    if (this.state.cursorTile === null) {
      tileChanged = input.tile !== null
    } else {
      tileChanged = !this.state.cursorTile.equals(input.tile);
    }
    this.state.setCursorState(input);
    if (input.buttons[1]) {
      tool = this.state.middleClickTool;
    }
    if (input.buttons[0]) {
      tool = this.state.activeTool;
    }
    if (
      tool !== null
      && tool.isActive
      && tool.triggersOn === "cursorMove"
    ) {
      tool.update(input);
    }
    this.queue.triggerEvent("cursorMove", this.state);

    if (tileChanged) {
      if (
        tool !== null
        && tool.isActive
        && tool.triggersOn === "tileChange"
      ) {
        tool.update(input);
      }
      this.queue.triggerEvent("tileChange", this.state);
    }
  }

  mouseUp(e: MouseEvent) {
    if (
      this.state.activeTool === null
      || !this.state.activeTool.isActive
    ) {return;}
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    if (e.button === 1) {
      this.state.middleClickTool.end(input);
    } else if (e.button === 0) {
      this.state.activeTool.end(input);
    }
  }

  mouseOut(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    const tileChanged = this.state.cursorTile !== null;
    
    this.state.setCursorState({
      position: null,
      tile: null,
      screen: null,
      buttons: input.buttons,
      modifiers: input.modifiers,
    });

    if (this.state.activeTool.isActive) {
      this.state.activeTool.end(input);
    }
    
    this.queue.triggerEvent("cursorMove", this.state);
    
    if (tileChanged) {
      this.queue.triggerEvent("tileChange", this.state);
    }
  }

  mouseWheel(e: WheelEvent) {
    if (!e.deltaY) {return;}
    e.preventDefault();
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    let direction = e.deltaY > 0 ? 1 : -1;
    this.state.wheelTool.wheel(input, direction);
  }
}