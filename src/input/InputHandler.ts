import { App } from "../system/App";
import { KeyInput, MouseInput } from "../types";
import { parseKeyInput, parseMouseInput } from "./parseInput";
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

  keyDown(e: KeyboardEvent) {
    const input: KeyInput = parseKeyInput(e);
    if (!!input && input in this.state.keyboard) {
      this.state.keyboard[input].run(this.app);
    }
  }

  mouseDown(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    if (e.button === 1) {
      this.state.middleClickTool.start(input);
    } else if (e.button === 0) {
      if (this.state.activeTool === null) {return;}
      this.state.activeTool.end(input);
    }
  }

  mouseUp(e: MouseEvent) {
    if (
      this.state.activeTool === null
      || !this.state.activeTool.isActive
    ) {return;}
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    this.state.activeTool.end(input);
  }

  mouseMove(e: MouseEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    if (this.state.activeTool !== null) {
      this.state.activeTool.update(input);
    }
    const tileChanged = !this.state.cursorTile.equals(input.tile);
    this.state.setCursorState(input);

    this.app.getSprites().forEach(sprite => {
      if (sprite.updateOnCursorMove) {
        sprite.update(this.state);
        this.queue.markForRender(sprite.getLayer());
      }
    })

    if (tileChanged) {
      this.app.getSprites().forEach(sprite => {
        if (sprite.updateOnTileChange) {
          sprite.update(this.state);
          this.queue.add(sprite, sprite.getLayer());
          this.queue.markForRender(sprite.getLayer());
        }
      });
    }
  }

  mouseWheel(e: WheelEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    this.state.wheelTool.wheel(input);
  }
}