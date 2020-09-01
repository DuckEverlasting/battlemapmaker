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
    /*
      These functions right here are where this should start next. We have a place set up to catch input.
      What we need is a decent interface to feed that input into for the actions.
      We already know what to do for the most part. The basic loop won't be different from SnapShot.
      - ondown, create action and set local state for it. set it to currentAction
      - onmove, if currentAction exists, call an update on it.
      - onup, resolve the action and delete it.

      - The "tools" as we know them will actually be tool ACTIONS. We'll need a factory to create them.
      - We'll need a good way to connect the tools to the project. If we're assuming there will be just the one TileMap,
        a reference to it should do the trick. We'll need some better tools to manipulate that data on that also.
      - Again, basically the implementations being used in SnapShot should work well here. There are differences, but 
        there is more than enough there to get I think just about all the way through the complicated stuff here.
      - One possible hiccup: selection. From a data standpoint, should be a cinch: just a set of numbers. Or even an boolean array acting as a mask.
      - Buuuuut the visuals might be a bit annoying. Gonna have to figure out how to draw along the borders of selected blocks efficiently.
      - Might be possible with just the standard marching squares, filling in the blocks to create a mask. I feel like there should be a
        much, much faster way though.
    */
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    if (e.button === 1) {
      this.state.middleClickTool.start(input);
    } else if (e.button === 0) {
      if (this.state.activeTool === null) {return;}
      this.state.activeTool.start(input);
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
    let tileChanged;
    if (this.state.cursorTile === null) {
      tileChanged = input.tile !== null
    } else {
      tileChanged = !this.state.cursorTile.equals(input.tile);
    }
    this.state.setCursorState(input);
    this.queue.triggerFlag("updateOnCursorMove", this.state);

    if (tileChanged) {
      if (this.state.activeTool !== null && this.state.activeTool.isActive) {
        this.state.activeTool.update(input);
      }
      this.queue.triggerFlag("updateOnTileChange", this.state);
    }
  }

  mouseWheel(e: WheelEvent) {
    const input: MouseInput = parseMouseInput(e, this.state.getTranslateData());
    this.state.wheelTool.wheel(input);
  }
}