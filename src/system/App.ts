import { Display } from "./Display";
import { State } from "./State";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard } from "../util/helpers";
import { Sprite, ImageSource, TileOutline } from "../graphics";
import { RenderQueue } from "./RenderQueue";

export class App implements AppType {
  private display: Display;
  private state: State;
  private media: ImageSource[];
  private sprites: Sprite[];
  private renderer: Renderer;
  private queue: RenderQueue;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(containingElement: HTMLElement) {
    const layerCount = 5;
    this.state = new State(getToolbox(this), getKeyboard(this));
    this.display = new Display(this.state, containingElement, layerCount);
    this.queue = new RenderQueue(layerCount);
    this.renderer = new Renderer(this);
    this.inputHandler = new InputHandler(this);
    this.eventEmitter = new EventEmitter(this.inputHandler, this.display);
    this.media = [];
    this.sprites = [];

    const temp = new OffscreenCanvas(this.state.tileWidth, this.state.tileHeight);
    temp.getContext('2d').strokeStyle = "black";
    temp.getContext('2d').lineWidth = 4;
    temp.getContext('2d').strokeRect(0, 0, temp.width, temp.height);
    temp.getContext('2d').strokeStyle = "white";
    temp.getContext('2d').lineWidth = 2;
    temp.getContext('2d').strokeRect(0, 0, temp.width, temp.height);
    this.media.push(new ImageSource(temp));
    const tempSprite = new TileOutline(this.media[0], 3);
    this.sprites.push(tempSprite);
    this.queue.add(this.display, 0);
    this.queue.add(this.sprites[0], 3);
  }
  
  getDisplay() {
    return this.display;
  }
  
  getState() {
    return this.state;
  } 
  
  getMedia() {
    return [...this.media];
  }
  
  getSprites() {
    return [...this.sprites];
  }

  getRenderer() {
    return this.renderer;
  }

  getQueue() {
    return this.queue;
  }

  reset() {
    this.eventEmitter.destroy();
    this.queue.reset();
    delete(this.state);
    delete(this.display);
    delete(this.renderer);
    delete(this.inputHandler);
    delete(this.eventEmitter);
    delete(this.media);
    delete(this.sprites);
  }
}
