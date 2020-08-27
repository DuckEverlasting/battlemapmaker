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

    // CONTENT BUILDING FOR TESTING PURPOSES - TEMP
    const temp = new OffscreenCanvas(this.state.tileWidth, this.state.tileHeight);
    temp.getContext('2d').strokeStyle = "black";
    temp.getContext('2d').lineWidth = 4;
    temp.getContext('2d').strokeRect(0, 0, temp.width, temp.height);
    temp.getContext('2d').strokeStyle = "white";
    temp.getContext('2d').lineWidth = 2;
    temp.getContext('2d').strokeRect(0, 0, temp.width, temp.height);
    const tempImageSrc = new ImageSource(temp);
    this.state.media[tempImageSrc.id] = tempImageSrc;
    const tempSprite = new TileOutline(this.state.media[0]);
    this.state.sprites[tempSprite.id] = tempSprite;
    this.queue.add(this.state.sprites[0], 4);

    const image = new Image(SpriteSheet_1.width, SpriteSheet_1.height);
    image.src = SpriteSheet_1;

    const tempSpriteSheet = new SpriteSheet(image, 32, 32);
    this.state.sprites[
      tempSpriteSheet.sprites[1].id
    ] = (tempSpriteSheet.sprites[1]);
    this.state.sprites[1].moveToTile(new Vector(3, 3));
    this.queue.add(this.state.sprites[1], 2);
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
