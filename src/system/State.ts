import { Tool, PanZoomTool, Keyboard, Toolbox } from "../types";
import { CalledAction } from "../actions";
import { ChangeActiveTool } from "../actions/ChangeActiveTool";

export class State {
  zoom: number;
  translateX: number;
  translateY: number;
  toolbox: Toolbox;
  activeTool: Tool | null;
  middleClickTool: PanZoomTool;
  wheelTool: PanZoomTool;
  altWheelTool: PanZoomTool;
  isDrawing: boolean;
  keyboard: Keyboard;

  constructor(toolbox: Toolbox, keyboard: Keyboard) {
    this.zoom = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.toolbox = toolbox;
    this.keyboard = keyboard;
    this.activeTool = null;
    this.middleClickTool = this.toolbox.move;
    this.wheelTool = this.toolbox.move;
    this.altWheelTool = this.toolbox.zoom;
  }
  // renderer: RENDERER; ???
  // selection: SOMETHING
  // loadedTilesets: TileSet[]; ???
  // Not totally sure this is needed. The zoom and translate stuff can go on display. or possibly somewhere else.
}