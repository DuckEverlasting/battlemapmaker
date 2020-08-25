import { Display } from "./Display";
import { State } from "./State";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard } from "../util/helpers";
import { Sprite, ImageSource, TileOutline } from "../graphics";

export class App implements AppType {
  private display: Display;
  private state: State;
  private media: ImageSource[];
  private sprites: Sprite[];
  private renderer: Renderer;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(containingElement: HTMLElement) {
    this.state = new State(getToolbox(this), getKeyboard(this));
    this.display = new Display(this.state, containingElement);
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
    const tempSprite = new TileOutline(this.media[0]);
    this.sprites.push(tempSprite);
    this.renderer.enqueue(this.sprites[0]);
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
}
