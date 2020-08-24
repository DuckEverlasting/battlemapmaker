import { App } from "../system/App";
import { KeyInput, MouseInput } from "../types";
import { modKey } from "../util/helpers";

export class InputHandler {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  keyDown(e: KeyboardEvent) {
    const input: KeyInput = this.parseKeyInput(e);
    if (!!input && input in this.app.state.keyboard) {
      this.app.state.keyboard[input].run(this.app);
    }
    console.log({input});
  }

  mouseDown(e: MouseEvent) {
    const input: MouseInput = this.parseMouseInput(e);
    if (e.button === 1) {
      this.app.state.middleClickTool.start(input);
    } else if (e.button === 0) {
      if (this.app.state.activeTool === null) {return;}
      this.app.state.activeTool.end(input);
    }
  }

  mouseUp(e: MouseEvent) {
    if (
      this.app.state.activeTool === null
      || !this.app.state.activeTool.isActive
    ) {return;}
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.activeTool.end(input);
  }

  mouseMove(e: MouseEvent) {
    if (this.app.state.activeTool === null) {return;}
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.activeTool.update(input);
  }

  mouseWheel(e: WheelEvent) {
    const input: MouseInput = this.parseMouseInput(e);
    this.app.state.middleClickTool.wheel(input);
  }

  parseMouseInput(e: MouseEvent) {
    let parsed: MouseInput; 
    return parsed;
  }

  parseKeyInput(e: KeyboardEvent): KeyInput | null {
    console.log(e)
    if (["Alt", "Shift", "Control", "Meta"].includes(e.key)) {
      return null;
    }
    let result: KeyInput = "";
    if (modKey(e)) result += "mod-";
    if (e.shiftKey) result += "shift-";
    if (e.altKey) result += "alt-";
    result += e.key;
    return result;
  }
}