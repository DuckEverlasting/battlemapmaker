import { Tool, PanZoomTool, Keyboard, Toolbox, TranslateData, MouseInput } from "../types";
import { Vector } from "../util/Vector";

export class State {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  zoom: number;
  tileWidth: number;
  tileHeight: number;
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

  constructor(toolbox: Toolbox, keyboard: Keyboard) {
    const rect = document.getElementById("project_container").getBoundingClientRect();
    this.zoom = 1;
    this.width = 800;
    this.height = 500;
    this.offsetX = Math.floor((rect.width - this.width) / 2);
    this.offsetY = Math.floor((rect.height - this.height) / 2);
    this.tileWidth = 50;
    this.tileHeight = 50;
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
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      width: this.width,
      height: this.height,
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
    }
  }

  setCursorState(input: MouseInput) {
    this.cursorPosition = input.position;
    this.cursorTile = input.tile;
    this.cursorButtons = input.buttons;
  }
  // loadedTilesets: TileSet[]; ???
}