import { Display } from "./Display";
import { State } from "./";
import { Renderer } from "./Renderer";
import { EventEmitter, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard, attachButtons, generateMaps } from "../util/helpers";
import { RenderQueue } from "./RenderQueue";
import { testRun } from "../temp/testRun";
import { TileMap, StagingTileMap } from "../graphics";

export class App implements AppType {
  private display: Display;
  private tileMap: TileMap;
  private stagingMap: StagingTileMap;
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
    const width = 960,
      height = 640,
      tileWidth = 64,
      tileHeight = 64;

    const [rect, tileMap, stagingMap] = generateMaps(
      width, height, tileWidth, tileHeight, layerCount
    );
    this.state = new State(
      rect, tileWidth, tileHeight, layerCount
    );
    this.tileMap = tileMap;
    this.stagingMap = stagingMap;
    this.display = new Display(this.state, containingElement, layerCount);
    this.queue = new RenderQueue(layerCount);
    this.queue.add(this.stagingMap);
    this.state.toolbox = getToolbox(this);
    this.state.keyboard = getKeyboard(this);
    this.state.middleClickTool = this.state.toolbox.move;
    this.state.wheelTool = this.state.toolbox.move;
    this.state.altWheelTool = this.state.toolbox.zoom;
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

  getTileMap() {
    return this.tileMap;
  }

  getStagingMap() {
    return this.stagingMap;
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
