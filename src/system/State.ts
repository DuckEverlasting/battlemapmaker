import { Tool, Scrollable, Keyboard } from "../types";
import { ToolAction } from "../../tools/ToolAction";

export default class State {
  zoom: number;
  translateX: number;
  translateY: number;
  activeTool: Tool;
  toolAction: ToolAction | null;
  middleClickAction: ToolAction & Scrollable;
  wheelAction: ToolAction;
  keyboard: Keyboard; 
  isDrawing: boolean;
  // renderer: RENDERER; ???
  // selection: SOMETHING
  // loadedTilesets: TileSet[]; ???
  // Not totally sure this is needed. The zoom and translate stuff can go on display. or possibly somewhere else.
}