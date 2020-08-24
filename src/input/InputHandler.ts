import App from "../system/App";
import { KeyInput, MouseInput } from "../types";
import { modKey } from "../../util/helpers";

export default class InputHandler {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  keyDown(e: KeyboardEvent) {
    const input: KeyInput = this.parseKeyInput(e);
    if (input in this.app.state.keyboard) {
      this.app.state.keyboard[input].run(this.app);
    }
    console.log({input});
  }

  keyUp(e: KeyboardEvent) {
    const input: KeyInput = this.parseKeyInput(e);
    if (input in this.app.state.keyboard) {
      this.app.state.keyboard[input].run(this.app);
    }
  }

  mouseDown(e: MouseEvent) {
    const input: MouseInput = this.parseMouseInput(e);
    if (e.button === 1) {
      this.app.state.middleClickAction.start(input);
    } else if (e.button === 0) {
      if (this.app.state.activeTool === null) {return;}
      this.app.state.toolAction.end(input);
    }
  }

  mouseUp(e: MouseEvent) {
    if (this.app.state.toolAction === null) {return;}
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.toolAction.end(input);
  }

  mouseMove(e: MouseEvent) {
    if (this.app.state.toolAction === null) {return;}
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.toolAction.update(input);
  }

  mouseWheel(e: WheelEvent) {
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.middleClickAction.wheel(input);
  }

  parseMouseInput(e: MouseEvent) {
    let parsed: MouseInput; 
    return parsed;
  }

  parseKeyInput(e: KeyboardEvent) {
    let result: KeyInput = "";
    if (e.ctrlKey) result += "ctrl-";
    if (modKey(e)) result += "mod-";
    if (e.shiftKey) result += "shift-";
    result += e.key;
    return result;
  }
}