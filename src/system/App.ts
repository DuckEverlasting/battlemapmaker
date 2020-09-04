import { Display } from "./Display";
import { State, Canvas } from "./";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard, generateRectAndMap } from "../util/helpers";
import { RenderQueue } from "./RenderQueue";
import { testRun } from "../_temp/testRun";
import { TileMap } from "../graphics";
import { Cursor } from "../graphics/queueables/Cursor";
import { LAYER } from "../enums";

export class App implements AppType {
  private display: Display;
  private tileMap: TileMap;
  private state: State;
  private renderer: Renderer;
  private queue: RenderQueue;
  private cursor: Cursor;
  private eventEmitter: EventEmitter;
  private inputHandler: InputHandler;

  constructor(
    containingElement: HTMLElement,
    toolButtons: {[key: string]: HTMLElement},
    layerButtons: HTMLElement[],
    palleteButtons: HTMLElement[],
    activeSpriteContainer: HTMLElement,
    layerCount: number = 8
  ) {
    const width = 960,
      height = 640,
      tileWidth = 64,
      tileHeight = 64;

    const [rect, tileMap] = generateRectAndMap(
      width, height, tileWidth, tileHeight, layerCount
    );
    this.state = new State(
      rect, tileWidth, tileHeight, layerCount
    );
    this.tileMap = tileMap;
    this.display = new Display(this.state, containingElement, layerCount, LAYER.EFFECT_ALL);
    this.cursor = new Cursor(this);
    this.queue = new RenderQueue(layerCount);
    this.queue.add(this.tileMap);
    this.queue.add(this.cursor);
    this.state.toolbox = getToolbox(this);
    this.state.keyboard = getKeyboard(this);
    this.state.middleClickTool = this.state.toolbox.move;
    this.state.wheelTool = this.state.toolbox.move;
    this.state.altWheelTool = this.state.toolbox.zoom;
    this.state.setActiveTool("freehand");
    this.renderer = new Renderer(this);
    this.state.palleteCanvas = palleteButtons.map(element => new Canvas(element));
    this.state.activeSpriteCanvas = new Canvas(activeSpriteContainer);
    this.inputHandler = new InputHandler(this);
    this.eventEmitter = new EventEmitter(this.inputHandler, this.display, {toolButtons, layerButtons, palleteButtons});

    // test run
    testRun(this);
  }

  getDisplay() {
    return this.display;
  }

  getState() {
    return this.state;
  }

  getTileMap() {
    return this.tileMap;
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
