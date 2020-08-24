import { App } from "../system/App";
import * as Tools from '../tools';
import { Toolbox, Keyboard } from "../types";
import { MoveTool } from "../tools";
import { ZoomTool } from "../tools/zoom/ZoomTool";

export function modKey(e: KeyboardEvent) {
  return navigator.appVersion.indexOf("Mac") !== -1
    ? !!e.metaKey
    : !!e.ctrlKey;
}

export function getToolbox(app: App) {
  const toolbox: Toolbox = {
    move: new MoveTool(app),
    zoom: new ZoomTool(app),
    fill: new Tools.FillTool(app),
    fillSelect: new Tools.FillSelectTool(app),
    freehand: new Tools.FreehandTool(app),
    freehandSelect: new Tools.FreehandSelectTool(app),
    erase: new Tools.EraseTool(app),
    polygon: new Tools.PolygonTool(app),
    polygonSelect: new Tools.PolygonSelectTool(app),
    shape: new Tools.ShapeTool(app),
    shapeSelect: new Tools.ShapeSelectTool(app)
  };
  return toolbox;
}

export function getKeyboard(app: App) {
  const keyboard: Keyboard = {

  }
  return keyboard; 
}