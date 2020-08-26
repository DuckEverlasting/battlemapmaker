import { Tool, PanZoomTool, Keyboard, Toolbox, TranslateData, MouseInput } from "../types";
import { Vector } from "../util/Vector";
import { Rect } from "../util/Rect";
import { ImageSource, Sprite } from "../graphics";
import { TileGraph } from "./TileGraph";

export class State {
  rect: Rect;
  zoom: number;
  tileWidth: number;
  tileHeight: number;
  layerCount: number;
  media: ImageSource[];
  sprites: Sprite[];
  tileGraph: TileGraph;
  cursorPosition: Vector;
  cursorTile: Vector;
  cursorButtons: boolean[];
  toolbox: Toolbox;
  keyboard: Keyboard;
  activeTool: Tool | null;
  middleClickTool: PanZoomTool;
  wheelTool: PanZoomTool;
  altWheelTool: PanZoomTool;
  isDrawing: boolean;
  renderNeeded: boolean;
  // selection: Selection;
  // selectionIsActive: boolean;

  mouseIsInside: boolean;

  constructor(
    initWidth: number,
    initHeight: number,
    initTileWidth: number,
    initTileHeight: number,
    layerCount: number,
    toolbox: Toolbox,
    keyboard: Keyboard
  ) {
    const clientRect = document.getElementById("project_container").getBoundingClientRect();
    this.zoom = 1;
    this.rect = new Rect(
      Math.floor((clientRect.width - initWidth) / 2),
      Math.floor((clientRect.height - initHeight) / 2),
      initWidth,
      initHeight
    );
    this.tileWidth = initTileWidth;
    this.tileHeight = initTileHeight;
    this.layerCount = layerCount;
    this.media = [];
    this.sprites = [];
    const rows = Math.floor(this.rect.height / this.tileHeight),
      columns = Math.floor(this.rect.width / this.tileWidth);
    this.tileGraph = new TileGraph(rows, columns, layerCount);
    this.cursorPosition = new Vector(0, 0);
    this.cursorTile = new Vector(-1, -1);
    this.cursorButtons = [false, false, false];
    this.toolbox = toolbox;
    this.keyboard = keyboard;
    this.activeTool = null;
    this.middleClickTool = this.toolbox.move;
    this.wheelTool = this.toolbox.move;
    this.altWheelTool = this.toolbox.zoom;
    this.isDrawing = false;
    this.renderNeeded = false;
  }

  getTranslateData(): TranslateData {
    return {
      zoom: this.zoom,
      rect: this.rect,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
    }
  }

  setCursorState(input: MouseInput) {
    this.cursorPosition = input.position;
    this.cursorTile = input.tile;
    this.cursorButtons = input.buttons;
  }
}