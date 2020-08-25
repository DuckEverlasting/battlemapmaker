import { App } from "../system/App";
import { KeyInput, MouseInput } from "../types";
import { parseKeyInput, parseMouseInput } from "./parseInput";

export class InputHandler {
  app: App;

  constructor(app: App) {
    this.app = app;
  }

  keyDown(e: KeyboardEvent) {
    const input: KeyInput = parseKeyInput(e);
    if (!!input && input in this.app.getState().keyboard) {
      this.app.getState().keyboard[input].run(this.app);
    }
  }

  mouseDown(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.app.getState().getTranslateData());
    if (e.button === 1) {
      this.app.getState().middleClickTool.start(input);
    } else if (e.button === 0) {
      if (this.app.getState().activeTool === null) {return;}
      this.app.getState().activeTool.end(input);
    }
  }

  mouseUp(e: MouseEvent) {
    if (
      this.app.getState().activeTool === null
      || !this.app.getState().activeTool.isActive
    ) {return;}
    const input: MouseInput = parseMouseInput(e, this.app.getState().getTranslateData());
    this.app.getState().activeTool.end(input);
  }

  mouseMove(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.app.getState().getTranslateData());
    if (this.app.getState().activeTool !== null) {
      this.app.getState().activeTool.update(input);
    }
    this.app.getState().setCursorState(input);

    this.app.getSprites().forEach(sprite => {
      if (sprite.updateOnCursorMove) {
        sprite.update(this.app.getState());
      }
    })

    if (!this.app.getSprites()[0].getPosition().equals(input.tile)) {
      this.app.getSprites().forEach(sprite => {
        if (sprite.updateOnTileChange) {
          sprite.update(this.app.getState());
          this.app.getRenderer().flagForRender();
        }
      });
    }
  }

  mouseWheel(e: WheelEvent) {
    const input: MouseInput = parseMouseInput(e, this.app.getState().getTranslateData());
    this.app.getState().wheelTool.wheel(input);
  }
}