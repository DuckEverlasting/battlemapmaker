import { App } from "../system/App";
import * as Tools from '../tools';
import { Toolbox, Keyboard } from "../types";
import { MoveTool } from "../tools";
import { ZoomTool } from "../tools/zoom/ZoomTool";
import { State, Canvas } from "../system";
import { TileMap } from "../graphics";
import { Rect } from "./Rect";
import { undo } from "../actions/undo";
import { redo } from "../actions/redo";

export function modKey(e: KeyboardEvent | MouseEvent) {
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
    'mod-z': () => undo(app),
    'mod-shift-z': () => redo(app)
  }
  return keyboard; 
}

export function getOffscreenCanvas(width: number, height: number) {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = width;
  return canvas;
}

export function getRange(low: number, high: number) {
  const result = [];
  for (let i = low; i < high; i++) {
    result.push(i);
  }
  return result;
}

export async function loadImage(imageSource: string) {
  let img;
  const wait = new Promise(resolve => {
    img = new Image();
    img.onload = resolve;
    img.src = imageSource;
  });
  await wait;
  return img;
};

export function generateRectAndMap(
  width: number,
  height: number,
  tileHeight: number,
  tileWidth: number,
  layerCount: number
): [Rect, TileMap] {
  const rect: Rect = new Rect(
    0,
    0,
    width,
    height
  );
  const tileMap: TileMap = new TileMap(
    Math.floor(rect.height / tileHeight),
    Math.floor(rect.width / tileWidth),
    layerCount - 2
  );
  return [rect, tileMap];
}
