import { Display } from "./Display";
import { State } from "./State";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard, attachButtons } from "../util/helpers";
import { RenderQueue } from "./RenderQueue";
import { testRun } from "../temp/testRun";


export class App implements AppType {
  private display: Display;
  private state: State;
  private renderer: Renderer;
  private queue: RenderQueue;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(
    containingElement: HTMLElement,
    toolButtons: {[key: string]: HTMLElement},
    layerButtons: HTMLElement[],
    activeSpriteContainer: HTMLElement,
    layerCount: number = 7
  ) {
    this.state = new State(
      960, 640, 64, 64,
      layerCount,
      getToolbox(this),
      getKeyboard(this)
    );
    this.display = new Display(this.state, containingElement, layerCount);
    this.queue = new RenderQueue(layerCount);
    this.renderer = new Renderer(this);
    this.inputHandler = new InputHandler(this);
    this.eventEmitter = new EventEmitter(this.inputHandler, this.display);
    attachButtons(toolButtons, layerButtons, activeSpriteContainer, this.state);

    // test run
    testRun(this);
  }

  getDisplay() {
    return this.display;
  }

  getState() {
    return this.state;
  }

  getMedia() {
    return { ...this.state.media };
  }

  getSprites() {
    return { ...this.state.sprites };
  }

  getRenderer() {
    return this.renderer;
  }

  getQueue() {
    return this.queue;
  }
}
