import { Display } from "./Display";
import { State } from "./State";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard } from "../util/helpers";
import { ImageSource, TileOutline, SpriteSheet } from "../graphics";
import { RenderQueue } from "./RenderQueue";

import SpriteSheet_1 from "../media/spritesheets/SpriteSheet_1.png"
import { Vector } from "../util/Vector";

export class App implements AppType {
  private display: Display;
  private state: State;
  private renderer: Renderer;
  private queue: RenderQueue;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(containingElement: HTMLElement, layerCount: number = 5) {
    this.state = new State(
      960, 640, 64, 64, 5,
      getToolbox(this),
      getKeyboard(this)
    );
    this.display = new Display(this.state, containingElement, layerCount);
    this.queue = new RenderQueue(layerCount);
    this.renderer = new Renderer(this);
    this.inputHandler = new InputHandler(this);
    this.eventEmitter = new EventEmitter(this.inputHandler, this.display);
  };
  
  getDisplay() {
    return this.display;
  }
  
  getState() {
    return this.state;
  } 
  
  getMedia() {
    return {...this.state.media};
  }
  
  getSprites() {
    return {...this.state.sprites};
  }

  getRenderer() {
    return this.renderer;
  }

  getQueue() {
    return this.queue;
  }
}
