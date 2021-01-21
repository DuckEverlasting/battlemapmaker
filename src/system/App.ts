import { Display } from "./Display";
import { State, Canvas } from "./";
import { Renderer } from "./Renderer";
import { EventHandler, InputHandler } from "../input"
import { AppType } from "../types";
import { getToolbox, getKeyboard, generateRectAndMap } from "../util/helpers";
import { RenderQueue } from "./RenderQueue";
import { testRun } from "../_temp/testRun";
import { TileMap } from "../graphics";
import { Cursor } from "../graphics/queueables/Cursor";
import { LAYER, LAYER_COUNT } from "../enums";
import { MenuHandler } from "../menu/MenuHandler";
import { Modal } from "../modals/Modal";
import { WelcomeModal } from "../modals/WelcomeModal";

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
    private containingElement: HTMLElement,
    toolButtons: {[key: string]: HTMLElement},
    layerButtons: HTMLElement[],
    palleteButtons: HTMLElement[],
    menuButtons: {[key: string]: HTMLElement},
    menuContainer: HTMLElement,
    activeSpriteContainer: HTMLElement,
  ) {
    this.loadingElement = document.createElement("div");
    Object.assign(this.loadingElement.style, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      width: "100vw",
      height: "100vh",
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, .7)",
      zIndex: 4
    });
    const spinner = document.createElement("div");
    spinner.className = "loader";
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
    this.display = new Display(this.state, this.containingElement, this.layerCount, LAYER.EFFECT_ALL);
    this.queue = new RenderQueue(this.layerCount);
    this.queue.add(this.tileMap);
    this.cursor = new Cursor(this);
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
    this.menuHandler = new MenuHandler(this, menuContainer);
    this.inputHandler = new InputHandler(this);
    this.eventHandler = new EventHandler(this, {
      toolButtons,
      layerButtons,
      palleteButtons,
      menuButtons,
      menuHandler: this.menuHandler,
    });

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
