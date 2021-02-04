import { Display } from "./Display";
import { State, Canvas } from "./";
import { Renderer } from "./Renderer";
import { EventHandler, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, generateRectAndMap } from "../util/helpers";
import { RenderQueue } from "./RenderQueue";
import { testRun } from "../_temp/testRun";
import { TileMap } from "../graphics";
import { Cursor } from "../graphics/queueables/Cursor";
import { LAYER, LAYER_COUNT } from "../enums";
import { MenuHandler } from "../menu/MenuHandler";
import { Modal } from "../components/modals/Modal";
import { WelcomeModal } from "../components/modals/WelcomeModal";
import { Keyboard } from "./Keyboard";
import styles from "./app.module.css"
import { buildMenu } from "../util/buildMenu";
import { getPallete } from "../util/getPallete";

export class App implements AppType {
  private display: Display;
  private tileMap: TileMap;
  private state: State;
  private renderer: Renderer;
  private queue: RenderQueue;
  private cursor: Cursor;
  private menuHandler: MenuHandler;
  private eventHandler: EventHandler;
  private inputHandler: InputHandler;
  private layerCount = LAYER_COUNT;
  private loadingElement: HTMLElement;

  constructor(
    uiElements: {[key: string]: HTMLElement},
  ) {
    this.loadingElement = document.createElement("div");
    this.loadingElement.className = styles["loading-element"];
    const spinner = document.createElement("div");
    spinner.className = styles["loader"];
    this.loadingElement.appendChild(spinner);
    const width = 960,
      height = 640,
      tileWidth = 32,
      tileHeight = 32;

    const [rect, tileMap] = generateRectAndMap(
      width, height, tileWidth, tileHeight, this.layerCount
    );
    this.state = new State(
      rect, tileWidth, tileHeight, this.layerCount
    );
    this.tileMap = tileMap;
    this.display = new Display(this.state, uiElements.displayContainer, this.layerCount, LAYER.EFFECT_ALL);
    this.eventHandler = new EventHandler();
    this.queue = new RenderQueue(this.layerCount, this.eventHandler);
    this.queue.add(this.tileMap);
    this.cursor = new Cursor(this);
    this.queue.add(this.cursor);
    this.state.toolbox = getToolbox(this);
    this.state.keyboard = new Keyboard(this);
    this.state.middleClickTool = this.state.toolbox.move;
    this.state.wheelTool = this.state.toolbox.move;
    this.state.altWheelTool = this.state.toolbox.zoom;
    this.state.setActiveTool("freehand");
    this.state.ui = {
      palleteButtons: getPallete(this, uiElements.pallete),
      layerButtons: getLayerButtons(uiElements.layerButtonBox),
      toolButtons: getToolButtons(uiElements.toolBox)
    }
    this.state.activeSpriteCanvas = new Canvas(uiElements.activeSpriteContainer);
    this.renderer = new Renderer(this);
    // palleteButtons.map(element => new Canvas(element));
    this.menuHandler = new MenuHandler(this, uiElements.menuContainer);
    buildMenu(this);
    this.inputHandler = new InputHandler(this);

    // test run
    testRun(this);

    this.setModal(new WelcomeModal(this));
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

  loadTileMap(json: string) {
    const data: any = JSON.parse(json);
    this.queue.remove(this.tileMap);
    const [ rect, tileMap ] = generateRectAndMap(
      data.width * this.state.tileWidth,
      data.height * this.state.tileHeight,
      this.state.tileWidth,
      this.state.tileHeight,
      this.state.layerCount
    );
    this.display.resize(rect.width, rect.height);
    this.state.rect = rect;
    tileMap.buildFromSeed(data, this);
    this.tileMap = tileMap;
    this.queue.add(this.tileMap);
  }

  getMedia() {
    return { ...this.state.media };
  }

  getSprites() {
    return { ...this.state.sprites };
  }

  getCursor() {
    return this.cursor;
  }

  getRenderer() {
    return this.renderer;
  }

  getQueue() {
    return this.queue;
  }

  getInputHandler() {
    return this.inputHandler;
  }

  getEventHandler() {
    return this.eventHandler;
  }

  callRender() {
    this.display.mainMarkedForRender = true;
  }

  setModal(modal: Modal) {
    if (this.state.currentModal) {
      this.clearModal();
    }
    const { element } = modal;
    document.getElementById("main-container").appendChild(element);
    this.state.currentModal = modal;
  }

  clearModal() {
    if (!this.state.currentModal) {
      return;
    }
    document.getElementById("main-container").removeChild(this.state.currentModal.element);
    this.state.currentModal = null;
  }

  startLoading() {
    if (this.state.isLoading) {
      return;
    }
    document.getElementById("main-container").appendChild(this.loadingElement);
    this.state.isLoading = true;
  }

  stopLoading() {
    if (!this.state.isLoading) {
      return;
    }
    document.getElementById("main-container").removeChild(this.loadingElement);
    this.state.isLoading = false;
  }
}
